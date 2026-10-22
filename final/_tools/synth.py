# -*- coding: utf-8 -*-
"""빠진 대사 하나를 CLOVA Voice Premium으로 합성해 tts/_new/에 받아 둔다."""
import os, sys, json, urllib.request, urllib.parse

KEY_ID = os.environ['NCP_CLOVA_CLIENT_ID']
KEY    = os.environ['NCP_CLOVA_CLIENT_SECRET']
URL    = 'https://naveropenapi.apigw.ntruss.com/tts-premium/v1/tts'

def synth(text, speaker, out):
    body = urllib.parse.urlencode({
        'speaker': speaker, 'text': text, 'format': 'mp3',
        'speed': '0', 'pitch': '0', 'volume': '0',
    }).encode('utf-8')
    req = urllib.request.Request(URL, data=body, headers={
        'X-NCP-APIGW-API-KEY-ID': KEY_ID,
        'X-NCP-APIGW-API-KEY': KEY,
        'Content-Type': 'application/x-www-form-urlencoded',
    })
    with urllib.request.urlopen(req, timeout=60) as r:
        data = r.read()
    with open(out, 'wb') as f:
        f.write(data)
    return len(data)

if __name__ == '__main__':
    key, speaker = sys.argv[1], sys.argv[2]
    text = sys.stdin.read().strip()
    out = os.path.join('tts', '_new', key + '.mp3')
    n = synth(text, speaker, out)
    print(f'OK {out}  {n:,} bytes  speaker={speaker}')
