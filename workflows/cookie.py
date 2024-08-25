import sys
import urllib
import requests
import json
import urllib.parse
import os

# 环境变量；域名
cookie_map = {
    "COOKIE": "juejin.cn",
}
COOKIE_CLOUD_URL = os.getenv("COOKIE_CLOUD_URL")
# USER_KEY = os.getenv("USER_KEY")
USER_PASSWORD = os.getenv("USER_PASSWORD")


def get_cloud_cookie():
    url = COOKIE_CLOUD_URL
    payload = json.dumps({"password": USER_PASSWORD})
    headers = {"Content-Type": "application/json"}
    response = requests.request("POST", url, headers=headers, data=payload)
    return json.loads(response.text)


def encode_cookie(text):
    return urllib.parse.quote_plus(text)


def serialize_cookie(cookie):
    str = f"{encode_cookie(cookie['name'])}={encode_cookie(cookie['value'])}"
    return str


if __name__ == "__main__":
    try:
        data = get_cloud_cookie()
        # 环境变量；域名
        env = ""
        for key, value in cookie_map.items():
            cookies = data["cookie_data"][value]
            cookie_str = "; ".join([serialize_cookie(c) for c in cookies])
            env_str = f'{key}="{cookie_str}"\n'
            env += env_str

        env = env.strip()
        with open(".env", "w", encoding="utf-8") as f:
            f.write(env)
    except:
        print("Unexpected error:", sys.exc_info()[0])
