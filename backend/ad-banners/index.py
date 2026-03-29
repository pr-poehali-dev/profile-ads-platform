import json
import os
import psycopg2

SCHEMA = os.environ.get('MAIN_DB_SCHEMA', 't_p86061415_profile_ads_platform')


def handler(event: dict, context) -> dict:
    """Возвращает список из 4 рекламных слотов с данными активных баннеров."""
    headers = {"Access-Control-Allow-Origin": "*", "Access-Control-Allow-Methods": "GET, OPTIONS", "Access-Control-Allow-Headers": "Content-Type"}

    if event.get("httpMethod") == "OPTIONS":
        return {"statusCode": 200, "headers": headers, "body": ""}

    conn = psycopg2.connect(os.environ["DATABASE_URL"])
    cur = conn.cursor()
    cur.execute(f"""
        SELECT id, slot, advertiser_name, link_url, image_url, is_active
        FROM {SCHEMA}.ad_banners
        ORDER BY slot
    """)
    rows = cur.fetchall()
    cur.close()
    conn.close()

    banners = [
        {"id": r[0], "slot": r[1], "advertiser_name": r[2], "link_url": r[3], "image_url": r[4], "is_active": r[5]}
        for r in rows
    ]

    return {"statusCode": 200, "headers": headers, "body": json.dumps({"banners": banners})}
