import json
import os
import psycopg2

SCHEMA = os.environ.get('MAIN_DB_SCHEMA', 't_p86061415_profile_ads_platform')
ADMIN_TOKEN = os.environ.get('ADMIN_TOKEN', 'profail-admin-2024')


def check_auth(event: dict) -> bool:
    token = event.get('headers', {}).get('x-admin-token', '')
    return token == ADMIN_TOKEN


def handler(event: dict, context) -> dict:
    """Управление рекламными баннерами и заявками: просмотр заявок, назначение баннера на слот, вкл/выкл."""
    headers = {
        "Access-Control-Allow-Origin": "*",
        "Access-Control-Allow-Methods": "GET, POST, PUT, DELETE, OPTIONS",
        "Access-Control-Allow-Headers": "Content-Type, X-Admin-Token"
    }

    if event.get("httpMethod") == "OPTIONS":
        return {"statusCode": 200, "headers": headers, "body": ""}

    if not check_auth(event):
        return {"statusCode": 401, "headers": headers, "body": json.dumps({"error": "Unauthorized"})}

    method = event.get("httpMethod")
    path = event.get("path", "/")
    body = json.loads(event.get("body") or "{}")

    conn = psycopg2.connect(os.environ["DATABASE_URL"])
    cur = conn.cursor()

    if method == "GET" and "/requests" in path:
        cur.execute(f"""
            SELECT id, advertiser_name, link_url, image_url, status, created_at
            FROM {SCHEMA}.ad_requests ORDER BY created_at DESC
        """)
        rows = cur.fetchall()
        result = [{"id": r[0], "advertiser_name": r[1], "link_url": r[2], "image_url": r[3], "status": r[4], "created_at": str(r[5])} for r in rows]
        cur.close(); conn.close()
        return {"statusCode": 200, "headers": headers, "body": json.dumps({"requests": result})}

    if method == "GET":
        cur.execute(f"SELECT id, slot, advertiser_name, link_url, image_url, is_active, updated_at FROM {SCHEMA}.ad_banners ORDER BY slot")
        rows = cur.fetchall()
        result = [{"id": r[0], "slot": r[1], "advertiser_name": r[2], "link_url": r[3], "image_url": r[4], "is_active": r[5], "updated_at": str(r[6])} for r in rows]
        cur.close(); conn.close()
        return {"statusCode": 200, "headers": headers, "body": json.dumps({"banners": result})}

    if method == "PUT":
        banner_id = body.get("id")
        is_active = body.get("is_active")
        advertiser_name = body.get("advertiser_name")
        link_url = body.get("link_url")
        image_url = body.get("image_url")
        request_id = body.get("request_id")

        cur.execute(f"""
            UPDATE {SCHEMA}.ad_banners
            SET is_active = COALESCE(%s, is_active),
                advertiser_name = COALESCE(%s, advertiser_name),
                link_url = COALESCE(%s, link_url),
                image_url = COALESCE(%s, image_url),
                updated_at = NOW()
            WHERE id = %s
        """, (is_active, advertiser_name, link_url, image_url, banner_id))

        if request_id:
            cur.execute(f"UPDATE {SCHEMA}.ad_requests SET status = 'approved' WHERE id = %s", (request_id,))

        conn.commit()
        cur.close(); conn.close()
        return {"statusCode": 200, "headers": headers, "body": json.dumps({"ok": True})}

    if method == "DELETE":
        banner_id = body.get("id")
        cur.execute(f"""
            UPDATE {SCHEMA}.ad_banners
            SET is_active = false, advertiser_name = NULL, link_url = NULL, image_url = NULL, updated_at = NOW()
            WHERE id = %s
        """, (banner_id,))
        conn.commit()
        cur.close(); conn.close()
        return {"statusCode": 200, "headers": headers, "body": json.dumps({"ok": True})}

    cur.close(); conn.close()
    return {"statusCode": 404, "headers": headers, "body": json.dumps({"error": "Not found"})}
