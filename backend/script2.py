import requests,json
from urllib.parse import urlparse

class Script:

    comments = []
    curs = 0
    post_id = None

    def __init__(self, post_url):
        self.post_url = post_url
        
        global post_id
        path = urlparse(post_url).path
        post_id = path.split('/')[-1]  # Get the last part of the path
    
    def req(self, post_id, curs):
        
        global post_url

        url = f'https://www.tiktok.com/api/comment/list/?WebIdLastTime=1730120021&aid=1988&app_language=en&app_name=tiktok_web&aweme_id={post_id}&browser_language=en-US&browser_name=Mozilla&browser_online=true&browser_platform=Win32&browser_version=5.0%20%28Windows%20NT%2010.0%3B%20Win64%3B%20x64%29%20AppleWebKit%2F537.36%20%28KHTML%2C%20like%20Gecko%29%20Chrome%2F130.0.0.0%20Safari%2F537.36&channel=tiktok_web&cookie_enabled=true&count=20&cursor={curs}&data_collection_enabled=false&device_id=7430808859349124616&device_platform=web_pc&focus_state=true&from_page=video&history_len=4&is_fullscreen=false&is_page_visible=true&odinId=7430808756831732743&os=windows&priority_region=&referer=&region=LK&screen_height=973&screen_width=1279&tz_name=Asia%2FColombo&user_is_login=false&verifyFp=verify_m2t13084_aLtGenI5_Jdlu_4o6m_9PQw_z6VTDhsjyij2&webcast_language=en&msToken=zjZvs4jTkUNOHmrCOiRFyLST9yhykKrdtFI3hhlE6O7JPKU3SxZT7NNvp4M5yGodeZfLAtd2BdbjVWUz2-mkbsb-7izBzDJmMO7JbemEbgnaDFtJu1PGek0P4HcMP2-Z8yNE1AdMsazeKOEl2ngQVug=&X-Bogus=DFSzswVuzHTANcN8tQznVIHogx5E&_signature=_02B4Z6wo00001wUP2iAAAIDBxOQ1iaJxOysFD96AAKZm1c'

        headers = {
            'accept':'*/*',
            'accept-language' : 'en-US,en;q=0.7,fa;q=0.8',
            'chache-controll' : 'no-cache',
            'pragma': 'no-cache',
            'priority': 'u=1, i',
            'referer':self.post_url,
            'sec-ch-ua':'"Chromium";v="130", "Brave";v="130", "Not?A_Brand";v="99"',
            'sec-ch-ua-mobile':'?0',
            'sec-ch-ua-platform':'"Windows"',
            'sec-fetch-dest':'empty',
            'sec-fetch-mode':'cors',
            'sec-fetch-site':'same-origin',
            'user-agent':'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/130.0.0.0 Safari/537.36'
            }
    
        response = requests.get(url=url, headers=headers)
        info = response.text
        raw_data = json.loads(info)
        return raw_data

    def parser(self, data):
        comment = data['comments']

        for cm in comment : 
            com = cm['share_info']['desc']

            if com == "":
                com = cm['text']

            self.comments.append(com)

        return data


    def getComments(self) :
        while 1:
            raw_data = self.req(post_id, self.curs)
            same_data = self.parser(raw_data)

            if same_data['has_more'] == 1:
                self.curs+=20
                print('################################### moving to the next cursor #################################################')
            else :
                print('################################### no comments available #################################################')
                break
        
        print(self.comments)
        
        # Write json file
        with open('comments.json', 'w+', encoding='utf-8') as f:
            f.seek(0)
            f.truncate()
            json.dump(self.comments, f, ensure_ascii=False, indent=4)

        return self.comments