import json
import os
import base64
import uuid
import psycopg2
import boto3
import urllib.request

SCHEMA = os.environ.get('MAIN_DB_SCHEMA', 't_p86061415_profile_ads_platform')


def send_telegram(bot_token: str, chat_id: str, text: str, image_url: str = None):
    msg_url = f"https://api.telegram.org/bot{bot_token}/sendMessage"
    data = json.dumps({"chat_id": chat_id, "text": text, "parse_mode": "HTML"}).encode()
    req = urllib.request.Request(msg_url, data=data, headers={"Content-Type": "application/json"})
    urllib.request.urlopen(req)


def handler(event: dict, context) -> dict:
    """Принимает заявку на рекламу: сохраняет файл в S3, запись в БД и уведомление в Telegram."""
    headers = {"Access-Control-Allow-Origin": "*", "Access-Control-Allow-Methods": "POST, OPTIONS", "Access-Control-Allow-Headers": "Content-Type"}

    if event.get("httpMethod") == "OPTIONS":
        return {"statusCode": 200, "headers": headers, "body": ""}

    body = json.loads(event.get("body") or "{}")
    advertiser_name = body.get("advertiser_name", "").strip()
    link_url = body.get("link_url", "").strip()
    image_b64 = body.get("image_b64", "")
    image_mime = body.get("image_mime", "image/jpeg")

    if not advertiser_name or not link_url or not image_b64:
        return {"statusCode": 400, "headers": headers, "body": json.dumps({"error": "Заполните все поля"})}

    s3 = boto3.client(
        "s3",
        endpoint_url="https://bucket.poehali.dev",
        aws_access_key_id=os.environ["AWS_ACCESS_KEY_ID"],
        aws_secret_access_key=os.environ["AWS_SECRET_ACCESS_KEY"],
    )

    ext = image_mime.split("/")[-1]
    key = f"ad-banners/{uuid.uuid4()}.{ext}"
    image_data = base64.b64decode(image_b64)
    s3.put_object(Bucket="files", Key=key, Body=image_data, ContentType=image_mime)
    image_url = f"https://cdn.poehali.dev/projects/{os.environ['AWS_ACCESS_KEY_ID']}/bucket/{key}"

    conn = psycopg2.connect(os.environ["DATABASE_URL"])
    cur = conn.cursor()
    cur.execute(
        f"INSERT INTO {SCHEMA}.ad_requests (advertiser_name, link_url, image_url) VALUES (%s, %s, %s) RETURNING id",
        (advertiser_name, link_url, image_url),
    )
    request_id = cur.fetchone()[0]
    conn.commit()
    cur.close()
    conn.close()

    bot_token = os.environ.get("TELEGRAM_BOT_TOKEN", "")
    chat_id = os.environ.get("TELEGRAM_CHAT_ID", "")
    if bot_token and chat_id:
        text = (
            f"📢 <b>Новая заявка на рекламу #{request_id}</b>\n\n"
            f"👤 <b>Рекламодатель:</b> {advertiser_name}\n"
            f"🔗 <b>Ссылка:</b> {link_url}\n"
            f"🖼 <b>Баннер:</b> {image_url}\n\n"
            f"Управление: /admin"
        )
        send_telegram(bot_token, chat_id, text)

    return {"statusCode": 200, "headers": headers, "body": json.dumps({"ok": True, "request_id": request_id})}
