const cheerio = require('cheerio');
const fs = require('fs');
const Domparser = require('dom-parser');

let test = '<!DOCTYPE HTML PUBLIC "-//W3C//DTD HTML 4.01 Transitional//EN">\n' +
  '<html lang="ko-KR" false >\n' +
  '<head>\n' +
  '    <title></title>\n' +
  '    <meta charset="utf-8">\n' +
  '    <meta name="viewport" content="width=device-width">\n' +
  '</head>\n' +
  '<body media-query-fix="fix" bgcolor="#ffffff" link="#3366cc" vlink="#3366cc" alink="#3366cc" leftmargin="0" marginheight="0" marginwidth="0" topmargin="0" style="margin:0;padding:0;">\n' +
  '<style type="text/css">\n' +
  '\n' +
  '    a, a:link, a:visited, a:active {color:#007eff;text-decoration:none;}\n' +
  '    a:hover {text-decoration:underline}\n' +
  '    * {text-rendering:optimizelegibility;-webkit-font-smoothing:antialiased;}\n' +
  '    img {-ms-interpolation-mode: bicubic;}\n' +
  '    table {border-collapse: collapse; border-spacing: 0;}\n' +
  '\n' +
  '    @media (max-width: 480px) {\n' +
  '        div[class=aapl-mobile-div] {display: block !important;-webkit-text-size-adjust:none;height:100% !important;important;overflow:visible !important;max-height:none !important;min-height:none !important;line-height:normal !important;}\n' +
  '        div[class=aapl-desktop-div] {display: none !important;height:0;overflow:hidden !important;max-height:0;min-height:0;line-height:0}\n' +
  '    }\n' +
  '    @media only screen and (min-width: 768px) and (max-width: 1024px) {\n' +
  '        a {color:inherit}\n' +
  '    }\n' +
  '</style>\n' +
  '<br><br>\n' +
  '<table border="0" cellpadding="0" cellspacing="0" align="center" style="border-collapse:collapse;border-spacing:0;">\n' +
  '    <tr>\n' +
  '        <td valign="top">\n' +
  '            <div class="aapl-desktop-div" style="display:block;padding:0;margin:0;height:100%;max-height:none;min-height:none;line-height:normal;overflow:visible;">\n' +
  '                <table class="aapl-desktop-tbl" border="0" cellpadding="0" cellspacing="0" align="center" style="border-collapse:collapse;border-spacing:0;width:742px;">\n' +
  '                    <tr>\n' +
  '                        <td class="left-gutter" style="width:40px;"></td>\n' +
  '                        <td><img width="42" height="42" alt="Apple" src="https://s.mzstatic.com/email/images_shared/logo_apple_d-2x.png" border="0" style="border:none;padding:0;margin:0;-ms-interpolation-mode:bicubic;"></td>\n' +
  '                        <td ko-KR false  align="right" style="font-size:32px; font-weight:300; font-family: \'Helvetica Neue\', Helvetica, Arial, sans-serif; color: rgb(136,136,136)">영수증</td>\n' +
  '                        <td class="right-gutter" style="width:40px;"></td>\n' +
  '                    </tr>\n' +
  '                    <tr height="20"><td colspan="4"></td><tr>\n' +
  '\n' +
  '                    <tr>\n' +
  '                        <td colspan="4" align="center">\n' +
  '                            <table class="aapl-desktop-tbl" border="0" cellspacing="0" cellpadding="0" width="660" style="border-collapse:collapse;border-spacing:0;">\n' +
  '                                <tr>\n' +
  '                                    <td>\n' +
  '                                        <table class="aapl-desktop-tbl" border="0" bordercolor="#ffffff" cellpadding="0" cellspacing="0" style="border-collapse:collapse;border-spacing:0;color:rgb(51,51,51);background-color: rgb(250,250,250);border-radius:3px;font-size:12px;font-family:\'Helvetica Neue\',Helvetica,Arial,sans-serif;">\n' +
  '                                            <tr height="46">\n' +
  '                                                <td  width="320" colspan="2" style="padding-left:20px;border-style: solid;border-color: white;border-left-width:0;border-right-width:1px;border-bottom-width: 1px;border-top-width: 0px;"><span style="color:rgb(102,102,102);font-size:10px;">APPLE ID</span><br>jimmyjaeyeon@gmail.com</td>\n' +
  '                                                <td width="340" rowspan="3" style="padding-left:20px;border-style:solid;border-color:white;border-left-width:0px;border-right-width:0px;border-top-width:0px; border-bottom-width:0px;">\n' +
  '                                                    <span style="color:rgb(102,102,102);font-size:10px;">청구지 주소</span><br>\n' +
  '                                                    MasterCard .... 1228<br>            kimJaeyeon<br>\n' +
  '                                                    흥덕중앙로 105번길 24 동원로얄듀크 1005동 1502호<br>202호<br>용인시/기흥구,  경기도  446-908                                                        </td>\n' +
  '                                            </tr>\n' +
  '                                            <tr height="46">\n' +
  '                                                <td  colspan="2" style="padding-left:20px;border-style:solid; border-color:white;border-left-width:0;border-right-width:1px;border-bottom-width:1px;border-top-width:0px;"><span style="color:rgb(102,102,102);font-size:10px;">날짜</span><br>2019.07.29</td>\n' +
  '                                            </tr>\n' +
  '                                            <tr height="46">\n' +
  '                                                <td style="padding-left:20px;border-style:solid;border-color:white;border-left-width:0;border-right-width:1px;border-bottom-width:0px;border-top-width:0px;"><span style="color:rgb(102,102,102);font-size:10px;">주문 ID</span>r><span style="color:#0070c9;"><a href="https://xp.apple.com/report/2/its_mail_sf?responseType=redirect&emailType=invoice&lang=ko_kr&eventType=linkClick&redirectUrl=https%3A%2F%2Fsupport.apple.com%2Fkb%2FHT204088%3Fcid%3Demail_receipt_itunes_article_HT204088" target="_blank" rel="nofollow noopener">MMZVFL7XMM</a></span></td>\n' +
  '                                                <td style="padding-left:20px;border-style:solid;border-color:white;border-left-width:0;border-right-width:1px;border-bottom-width:0px;border-top-width:0px;"><span style="color:rgb(102,102,102);font-size:10px;">문서 번호</spar>197281619562</td>\n' +
  '                                            </tr>\n' +
  '                                        </table>\n' +
  '                                    </td>\n' +
  '                                </tr>\n' +
  '\n' +
  '                                <tr height="30"><td></td></tr>\n' +
  '                                <tr>\n' +
  '                                    <td>\n' +
  '                                        <table class="aapl-desktop-tbl" width="660" border="0" cellpadding="0" cellspacing="0" style="border-collapse:collapse;border-spacing:0;width:660px;color:rgb(51,51,51);font-size:12px;font-family:\'Helvetica Neue\',Helvetica,Arial,sans-serif;">\n' +
  '                                            <tr height="24" style="background-color: rgb(250,250,250);" class="section-header">\n' +
  '                                                <td colspan="2" width="350" style="width:350px;padding-left:10px;border-top-left-radius:3px;border-bottom-left-radius:3px;"><span style="font-size:14px;font-weight:500;">Apple 서비스</span></td>\n' +
  '                                                <td width="90" align="right" style="width:100px;padding:0 20px 0 0;position:relative;top:1;border-top-right-radius:3px;border-bottom-right-radius:3px;"><span style="color:rgb(102,102,102);font-size:10px;white-space:nowrap;">가격</span></td>\n' +
  '                                            </tr>\n' +
  '                                            <tr height="15"><td colspan="3"></td></tr>\n' +
  '                                            <tr style="max-height:114px;">\n' +
  '                                                <td width="64" class="artwork-cell" align="center" valign="top" style="padding: 0 0 0 20px;margin:0;width:64px;">\n' +
  '                                                    <img src="https://s.mzstatic.com/email/images_shared/dItemArtMusic_64_2x.jpg" width="64" height="64" border="0" alt="" style="padding:0;margin:0;-ms-interpolation-mode: bicubic;border:none;">\n' +
  '                                                </td>\n' +
  '                                                <td style="padding: 0 0 0 20px;line-height:15px;" class="item-cell">\n' +
  '                                                    <span class="title" style="font-weight:600;">Apple Music 구독 멤버십</span><br>\n' +
  '                                                    <span class="duration" style="color:rgb(102,102,102);">Apple Music 구독 멤버십(월별)</span><br>\n' +
  '                                                    <span class="renewal" style="color:rgb(102,102,102);">\n' +
  '      2019.08.28에 갱신 예정\n' +
  '            </span><br>\n' +
  '                                                    <span class="device" style="color:rgb(102,102,102);"> </span><br>      <span class="item-links" style="font-size:10px;">\n' +
  '                  </span>\n' +
  '                                                </td>\n' +
  '                                                <td width="100" class="price-cell" align="right" valign="top" style="padding:0 20px 0 0;padding-top:22px;width:100px;">\n' +
  '                                                    <span style="font-weight:600;white-space:nowrap;">￦8,900</span>\n' +
  '                                                </td>\n' +
  '                                            </tr>\n' +
  '                                        </table>\n' +
  '                                    </td>\n' +
  '                                </tr>\n' +
  '                                <tr>\n' +
  '                                    <td>\n' +
  '                                        <table class="aapl-desktop-tbl" width="660" border="0" cellpadding="0" cellspacing="0" style="border-collapse:collapse;border-spacing:0;width:660px;color:rgb(51,51,51);font-family:\'Helvetica Neue\',Helvetica,Arial,sans-serif;">\n' +
  '                                            <tr height="30"><td colspan="3"></td></tr>\n' +
  '                                            <tr height="1"><td height="1" colspan="3" style="padding:0 10px 0 10px;"><div style="line-height:1px;height:1px;background-color:rgb(238,238,238);"></div></td></tr>\n' +
  '                                            <tr height="48">\n' +
  '                                                <td align="right" style="color:rgb(102,102,102);font-size:10px;font-weight:600;padding: 0 30px 0 0;border-width:1px;border-color:rgb(238,238,238);">총계</td>\n' +
  '                                                <td width="1" style="background-color:rgb(238,238,238);width:1px;"></td>\n' +
  '                                                <td width="90" align="right" style="width:120px;padding:0 20px 0 0;font-size:16px;font-weight:600;white-space:nowrap;">\n' +
  '                                                    ￦8,900\n' +
  '                                                </td>\n' +
  '                                            </tr>\n' +
  '                                            <tr height="1"><td height="1" colspan="3" style="padding:0 10px 0 10px;"><div style="line-height:1px;height:1px;background-color:rgb(238,238,238);"></div></td></tr>\n' +
  '                                        </table>\n' +
  '                                    </td>\n' +
  '                                </tr>\n' +
  '                            </table>\n' +
  '                        </td>\n' +
  '                    </tr>\n' +
  '                    <tr class="footer-notice-spacer" style="height:20px"><td colspan="4"></td></tr>\n' +
  '                    <tr>\n' +
  '                        <td></td>\n' +
  '                        <td colspan="2" align="center" style="font-size:12px;font-family:\'Helvetica Neue\',Helvetica,Arial,sans-serif;color:rgb(102,102,102)">\n' +
  '                            구독 및 구입에 대한 도움을 받으십시오. <a href="https://support.apple.com/ko-kr/billing?cid=email_receipt">Apple 지원 바로가기</a></br></br>                    iTunes, Apple Books 및 App Store 구입과 관련된 <a href="ht204030?cid=email_receipt_itunes_article_HT204030">암호 환경설정 관리</a> 방법을 알아보십시오.<br><br>            국내 제휴 카드를 비롯한 국제 브랜드 신용 카드 및 직불 카드 사용 시 해당 카드사의 수수료가 청구될 수 있습니다. 수수료 관련d>\n' +
  '                        <td></td>\n' +
  '                    </tr>\n' +
  '                    <tr class="footer-spacer" style="height:40px"><td colspan="4"></td></tr><tr>\n' +
  '                    <td></td>\n' +
  '                    <td class="" colspan="2" align="center" style="font-size:12px; font-family: \'Helvetica Neue\',Helvetica,Arial,sans-serif; color: rgb(102,102,102)">\n' +
  '                        <img class="large-footer-logo" width="26" height="26" border="0" alt="Apple" src="https://s.mzstatic.com/email/images_shared/logo_apple_small_d-2x.png" style="border:none;padding:0;margin:0;-ms-interpolation-mode: bicubic;">\n' +
  '                        <img class="small-footer-logo" width="14" height="14" border="0" alt="Apple" src="https://s.mzstatic.com/email/images_shared/logo_apple_small_m-3x.png" style="display:none;border:none;padding:0;margin:0;-ms-interpolation-mode: bicubic;">\n' +
  '                    </td>\n' +
  '                    <td></td>\n' +
  '                </tr>\n' +
  '                    <tr height="8"><td colspan="4"></td></tr>\n' +
  '                    <tr>\n' +
  '                        <td></td>\n' +
  '                        <td colspan="2" align="center" style="font-size:12px; font-family: \'Helvetica Neue\',Helvetica,Arial,sans-serif; color: rgb(102,102,102)">\n' +
  '                            <a href="https://xp.apple.com/report/2/its_mail_sf?responseType=redirect&emailType=invoice&lang=ko_kr&eventType=linkClick&redirectUrl=https%3A%2F%2Fbuy.itunes.apple.com%2FWebObjects%2FMZFinance.woa%2Fwa%2FaccountSummary" style="color:#0073ff;">Apple ID 계정 정보</a> &#8226; <a href="https://xp.apple.com/report/2/its_mail_sf?responseType=redirect&emailType=invoice&lang=ko_kr&eventType=linkClick&redirectUrl=https%3A%2F%2Fwww.apple.com%2Flegal%2Fitunes%2Fappstorer%2Fterms.html%23SALE" style="color:#0073ff;">판매 약관</a> &#8226; <a href="https://xp.apple.com/report/2/its_mail_sf?responseType=redirect&emailType=invoice&lang=ko_kr&eventType=linkClick&redirectUrl=https%3A%2F%2Fwww.apple.com%2Fkrrivacy%2F" style="color:#0073ff;">개인정보 처리방침</a>\n' +
  '                        </td>\n' +
  '                        <td></td>\n' +
  '                    </tr>\n' +
  '                    <tr height="25"><td colspan="4"></td></tr>\n' +
  '                    <tr>\n' +
  '                        <td></td>\n' +
  '                        <td colspan="2" align="center" style="font-size:12px;font-family:\'Helvetica Neue\',Helvetica,Arial,sans-serif;color:rgb(102,102,102)">\n' +
  '                            Copyright © 2019 Apple Distribution International<br><a href="https://xp.apple.com/report/2/its_mail_sf?responseType=redirect&emailType=invoice&lang=ko_kr&eventType=linkClick&redirectUrl=https%3A%2F%2Fwww.apple.com%2Flegal%2F" style="color:#1187FF">모든 권리 보유</a>\n' +
  '                            <br><span class="legal-entity">\n' +
  '      Hollyhill Industrial Estate, Hollyhill, Cork, Ireland\n' +
  '      </span>\n' +
  '                        </td>\n' +
  '                        <td></td>\n' +
  '                    </tr>\n' +
  '                    <tr height="25"><td colspan="4" height="30"></td></tr>\n' +
  '                </table>\n' +
  '            </div>\n' +
  '\n' +
  '\n' +
  '\n' +
  '            <div class="aapl-mobile-div" style="display:none;padding:0;margin:0;height:0;max-height:0;min-height:none;line-height:0;overflow:hidden;">\n' +
  '                <table class="aapl-mobile-tbl" border="0" cellpadding="0" cellspacing="0" width="480" align="center" style="border-collapse:collapse;border-spacing:0;">\n' +
  '                    <tr>\n' +
  '                        <td class="aapl-mobile-cell" width="15" style=""></td>\n' +
  '                        <td class="aapl-mobile-cell"><img width="22" height="22" alt="Apple" src="https://s.mzstatic.com/email/images_shared/logo_apple_m-3x.png" border="0" style="border:none;padding:0;margin:0;"></td>\n' +
  '                        <td class="aapl-mobile-cell"ko-KR false  align="right" style="font-size:32px; font-family: \'Helvetica Neue\', Helvetica, Arial, sans-serif; color: rgb(136,136,136);">영수증</td>\n' +
  '                        <td class="aapl-mobile-cell" width="15" style=""></td>\n' +
  '                    </tr>\n' +
  '                    <tr height="15"><td class="aapl-mobile-cell" colspan="4" style=""></td><tr>\n' +
  '                    <tr>\n' +
  '                        <td class="aapl-mobile-cell" colspan="4" align="center" style="">\n' +
  '                            <table class="aapl-mobile-tbl" border="0" cellspacing="0" cellpadding="0" width="450" style="border-collapse:collapse;border-spacing:0;">\n' +
  '                                <tr>\n' +
  '                                    <td class="aapl-mobile-cell" style="">\n' +
  '                                        <table class="aapl-mobile-tbl" border="0" bordercolor="#ffffff" cellpadding="0" cellspacing="0" style="border-collapse:collapse;border-spacing:0;color:rgb(51,51,51);background-color: rgb(250,250,250);border-radius:3px;font-size:12px;font-family:\'Helvetica Neue\',Helvetica,Arial,sans-serif;border-color:#ffffff;border-style:solid;border-top-color:#ffffff;border-bottom-color:#ffffff;">\n' +
  '                                            <tr height="44">\n' +
  '                                                <td  colspan="2" class="aapl-mobile-cell" style="padding-left:15px;border-style:solid;border-color:#ffffff;border-top-width:0px; border-left-width:0;border-right-width:0 border-bottom-width:1px;">\n' +
  '                                                    <span style="color:rgb(102,102,102);font-size:10px;font-weight:600;">APPLE ID</span><br><span style="color:#0073ff;">jimmyjaeyeon@gmail.com</span>\n' +
  '                                                </td>\n' +
  '                                            </tr>\n' +
  '                                            <tr height="44">\n' +
  '                                                <td class="aapl-mobile-cell" width="225" style="padding-left:15px;border-style:solid;border-color:#ffffff;border-top-width:0px;border-left-width:0;border-right-width:1px;border-bottom-width:1px;">\n' +
  '                                                    <span style="color:rgb(102,102,102);font-size:10px;font-weight:600;">주문 ID</span><br><span style="color:#0070c9;">MMZVFL7XMM</span>          </td>\n' +
  '                                                <td class="aapl-mobile-cell" width="225" style="padding-left:15px;border-style:solid;border-color:#ffffff;border-top-width:0px;border-left-width:0;border-right-width:0;border-bottom-width:1px;">\n' +
  '            <span style="color:rgb(102,102,102);font-size:10px;font-weight:600;">\n' +
  '                              문서 번호</span><br>197281619562\n' +
  '                                                </td>\n' +
  '                                            </tr>\n' +
  '                                            <tr height="44">\n' +
  '                                                <td colspan="2" class="aapl-mobile-cell" style="padding-left:15px;border-style:solid;border-color:#ffffff;border-top-width:0px;border-left-width:0;border-right-width:1px;border-bottom-width:1px;">\n' +
  '                                                    <span style="color:rgb(102,102,102);font-size:10px;font-weight:600;">날짜</span><br>2019.07.29          </td>\n' +
  '                                            </tr>\n' +
  '\n' +
  '                                            <tr height="90">\n' +
  '                                                <td class="aapl-mobile-cell" colspan="2" style="padding-left:15px;padding-right:15px;border-style:solid;border-color:#ffffff;border-top-width:0px;border-left-width:0;border-right-width:0;border-bottom-width:0px;padding-top:8px;padding-bottom:8px;">\n' +
  '                                                    <span style="color:rgb(102,102,102);font-size:10px;font-weight:600;">청구지 주소</span><br>\n' +
  '                                                    MasterCard .... 1228<br>            kimJaeyeon<br>\n' +
  '                                                    흥덕중앙로 105번길 24 동원로얄듀크 1005동 1502호<br>202호<br>용인시/기흥구,  경기도  446-908                                              </td>\n' +
  '                                            </tr>\n' +
  '                                        </table>\n' +
  '                                    </td>\n' +
  '                                </tr>\n' +
  '\n' +
  '                                <tr height="20"><td class="aapl-mobile-cell" style=""></td></tr>\n' +
  '                                <tr>\n' +
  '                                    <td width="450" class="aapl-mobile-cell" style="">\n' +
  '                                        <table class="aapl-mobile-tbl" border="0" cellpadding="0" cellspacing="0" style="border-collapse:collapse;border-spacing:0;width:100%;color:rgb(51,51,51);font-size:12px;font-family:\'Helvetica Neue\',Helvetica,Arial,sans-serif;">\n' +
  '                                            <tr height="24" style="background-color:rgb(250,250,250);" class="section-header">\n' +
  '                                                <td class="aapl-mobile-cell" colspan="2" style="padding-left:15px;"><span style="font-size:11px;font-weight:600;">Apple 서비스</span></td>\n' +
  '                                                <td width="90" align="right" style="width:90px;padding-right:15px;position:relative;top:1;"><span style="color:rgb(102,102,102);font-size:10px;white-space:nowrap;">가격</span></td>\n' +
  '                                            </tr>\n' +
  '                                            <tr height="15"><td colspan="3"></td></tr>\n' +
  '                                            <tr style="max-height:114px;">\n' +
  '                                                <td width="75" class="artwork-cell aapl-mobile-cell" align="center" valign="top" style="padding: 0 0 0 15px;margin:0;width:64px;">\n' +
  '                                                    <img src="https://s.mzstatic.com/email/images_shared/dItemArtMusic_64_2x.jpg" width="64" height="64" border="0" alt="" style="padding:0;margin:0;-ms-interpolation-mode: bicubic;border:none;">\n' +
  '                                                </td>\n' +
  '                                                <td style="padding: 0 0 0 15px;line-height:15px;" class="item-cell aapl-mobile-cell">\n' +
  '                                                    <span class="title" style="font-weight:600;">Apple Music 구독 멤버십</span><br>\n' +
  '                                                    <span class="duration" style="color:rgb(102,102,102); font-size:10px;">Apple Music 구독 멤버십(월별)</span><br>\n' +
  '                                                    <span class="renewal" style="color:rgb(102,102,102); font-size:10px;">\n' +
  '      2019.08.28에 갱신 예정\n' +
  '            </span><br>\n' +
  '                                                    <span class="device" style="color:rgb(102,102,102); font-size:10px;"> </span><br>      <span class="item-links" style="font-size:10px;">\n' +
  '                  </span>\n' +
  '                                                </td>\n' +
  '                                                <td width="100" class="price-cell aapl-mobile-cell" align="right" valign="top" style="padding-right:15px;padding-top:22px;width:100px;">\n' +
  '                                                    <span style="font-weight:600;white-space:nowrap;">￦8,900</span>\n' +
  '                                                </td>\n' +
  '                                            </tr>\n' +
  '                                        </table>\n' +
  '                                    </td>\n' +
  '                                </tr>\n' +
  '                                <tr>\n' +
  '                                    <td class="aapl-mobile-cell" style="">\n' +
  '                                        <table class="aapl-mobile-tbl" width="450" border="0" cellpadding="0" cellspacing="0" style="width:450px;color:rgb(51,51,51);font-family:\'Helvetica Neue\',Helvetica,Arial,sans-serif;">\n' +
  '                                            <tr height="30"><td class="aapl-mobile-cell" colspan="2" style=""></td></tr>\n' +
  '                                            <tr height="1"><td class="aapl-mobile-cell" height="1" colspan="2" style="padding:0 10px 0 10px;"><div style="line-height:1px;height:1px;background-color:rgb(238,238,238);"></div></td></tr>\n' +
  '                                            <tr height="48">\n' +
  '                                                <td class="aapl-mobile-cell" style="padding-left:15px;color:rgb(102,102,102);font-size:10px;font-weight:600;">총계</td>\n' +
  '                                                <td class="aapl-mobile-cell" width="120" align="right" style="width:120px;padding-right:15px;font-size:16px;font-weight:600;white-space:nowrap;">\n' +
  '                                                    ￦8,900\n' +
  '                                                </td>\n' +
  '                                            </tr>\n' +
  '                                            <tr height="1"><td class="aapl-mobile-cell" height="1" colspan="2" style="padding:0 10px 0 10px;"><div style="line-height:1px;height:1px;background-color:rgb(238,238,238);"></div></td></tr>\n' +
  '                                        </table>\n' +
  '                                    </td>\n' +
  '                                </tr>\n' +
  '\n' +
  '                            </table>\n' +
  '                        </td>\n' +
  '                    </tr>\n' +
  '                    <tr height="15"><td colspan="4" class="aapl-mobile-cell" style=""></td></tr>\n' +
  '                    <tr>\n' +
  '                        <td class="aapl-mobile-cell" style=""></td>\n' +
  '                        <td class="aapl-mobile-cell" colspan="2" align="center" style="font-size:12px;font-family:\'Helvetica Neue\',Helvetica,Arial,sans-serif;color:rgb(102,102,102);">\n' +
  '                            구독 및 구입에 대한 도움을 받으십시오. <a href="https://support.apple.com/ko-kr/billing?cid=email_receipt">Apple 지원 바로가기</a></br></br>                    iTunes, Apple Books 및 App Store 구입과 관련된 <a href="https:30?cid=email_receipt_itunes_article_HT204030">암호 환경설정 관리</a> 방법을 알아보십시오.<br><br>        국내 제휴 카드를 비롯한 국제 브랜드 신용 카드 및 직불 카드 사용 시 해당 카드사의 수수료가 청구될 수 있습니다. 수수료 관련 질문이 td>\n' +
  '                        <td class="aapl-mobile-cell" style="display:none;max-height:0;line-height:0;mso-hide:all;"></td>\n' +
  '                    </tr>\n' +
  '                    <tr height="25"><td colspan="4" class="aapl-mobile-cell" style=""></td></tr>\n' +
  '                    <tr>\n' +
  '                        <td class="aapl-mobile-cell" style=""></td>\n' +
  '                        <td class="aapl-mobile-cell" colspan="2" align="center" style="font-size:12px; font-family: \'Helvetica Neue\',Helvetica,Arial,sans-serif; color: rgb(102,102,102);">\n' +
  '                            <img width="14" height="14" border="0" alt="" src="https://s.mzstatic.com/email/images_shared/logo_apple_small_m-3x.png" style="border:none;padding:0;margin:0;-ms-interpolation-mode: bicubic;">\n' +
  '                        </td>\n' +
  '                        <td class="aapl-mobile-cell" style=""></td>\n' +
  '                    </tr>\n' +
  '                    <tr height="8"><td class="aapl-mobile-cell" colspan="4" style=""></td></tr>\n' +
  '                    <tr>\n' +
  '                        <td class="aapl-mobile-cell" style=""></td>\n' +
  '                        <td class="aapl-mobile-cell" colspan="2" align="center" style="font-size:12px; font-family: \'Helvetica Neue\',Helvetica,Arial,sans-serif; color: rgb(102,102,102);">\n' +
  '                            <a href="https://buy.itunes.apple.com/WebObjects/MZFinance.woa/wa/accountSummary" style="color:#0073ff;">Apple ID 계정 정보</a> &#8226; <a href="https://xp.apple.com/report/2/its_mail_sf?responseType=redirect&emailType=invoice&lan_kr&eventType=linkClick&redirectUrl=https%3A%2F%2Fwww.apple.com%2Flegal%2Fitunes%2Fappstore%2Fkr%2Fterms.html%23SALE" style="color:#0073ff;">판매 약관</a> &#8226; <a href="https://xp.apple.com/report/2/its_mail_sf?responseType=redirecailType=invoice&lang=ko_kr&eventType=linkClick&redirectUrl=https%3A%2F%2Fwww.apple.com%2Fkr%2Fprivacy%2F" style="color:#0073ff;">개인정보 처리방침</a>\n' +
  '                        </td>\n' +
  '                        <td class="aapl-mobile-cell" style=""></td>\n' +
  '                    </tr>\n' +
  '                    <tr height="25"><td colspan="4" class="aapl-mobile-cell" style=""></td></tr>\n' +
  '                    <tr>\n' +
  '                        <td class="aapl-mobile-cell" style=""></td>\n' +
  '                        <td class="aapl-mobile-cell" colspan="2" align="center" style="font-size:12px;font-family:\'Helvetica Neue\',Helvetica,Arial,sans-serif;color:rgb(102,102,102);">\n' +
  '                            Copyright © 2019 Apple Distribution International<br><a href="https://xp.apple.com/report/2/its_mail_sf?responseType=redirect&emailType=invoice&lang=ko_kr&eventType=linkClick&redirectUrl=https%3A%2F%2Fwww.apple.com%2Flegal%2F" style="color:#0073ff">모든 권리 보유</a>\n' +
  '                            <br><span class="legal-entity">\n' +
  '      Hollyhill Industrial Estate, Hollyhill, Cork, Ireland\n' +
  '      </span>\n' +
  '                        </td>\n' +
  '                        <td class="aapl-mobile-cell" style=""></td>\n' +
  '                    </tr>\n' +
  '                    <tr height="25"><td colspan="4" height="30" class="aapl-mobile-cell" style=""></td></tr>\n' +
  '                </table>\n' +
  '            </div>\n' +
  '\n' +
  '\n' +
  '\n' +
  '        </td>\n' +
  '    </tr>\n' +
  '</table>\n' +
  '<img border="0" alt="" width="1" height="1" src="https://xp.apple.com/report/2/its_mail_sf?responseType=image&emailType=invoice&lang=ko_kr&eventType=open" style="border:none;display:none;" />  <br><br>\n' +
  '</body>\n' +
  '<img src=\'http://outsideapple.apple.com/img/APPLE_EMAIL_LINK/spacer4.gif?v=2&a=%2FreOOAuRz3hYhvues6ZpFYGTtfwnesWmzfenSEy1eEBkyXJUnAIbeIpFUZKopOOYxn%2FAhYmapYLKswVqgDv0Ts9cjfEpg0M428FMCQMTT4ZwShXfOaVONHng6qwD%2FPiaAR%2F5EcTgyChlKIC0XBgOJp7CacHOf1NsrnaJl9ERLRX74VK87lcKw1yV35rTKXiHY8l3de%2BRXIczCHvzA4NH2DZ7g6FjPmhNeo74IoqFn4uwpdNnmdEOr3%2BC4XmeBWSmul2U3btQ1sEw2eSHoG76X%2FX8VbmAII1EtjtrlqWLeSnmTZFAgQvMHav5ziMj197WK3qnj19lb2cC3desujF39HLG6crxN0Z47sufz%2FMBg27xtgyZ8FFe8r5fn1JMj8%2FZPxLuTzp6%2ByjIxizIU1dSXMEt75FVKloKhX6F%2BpySnAY%2BKl8FcCQIU6Gdkx5GG0hN\'/>\n' +
  '</html>\n' +
  'GET /api/16c3b300da121d9c 200 707.242 ms - -\n' +
  'called printMessage method\n' +
  '<!DOCTYPE HTML PUBLIC "-//W3C//DTD HTML 4.01 Transitional//EN"><html lang="ko-KR" false >\n' +
  '<head>\n' +
  '    <title></title>\n' +
  '    <meta name="viewport" content="width=device-width">\n' +
  '</head>\n' +
  '<body media-query-fix="fix" bgcolor="#ffffff" link="#3366cc" vlink="#3366cc" alink="#3366cc" leftmargin="0" marginheight="0" marginwidth="0" topmargin="0" style="margin:0;padding:0;">\n' +
  '<style type="text/css">\n' +
  '\n' +
  '    a, a:link, a:visited, a:active {color:#007eff;text-decoration:none;}\n' +
  '    a:hover {text-decoration:underline}\n' +
  '    * {text-rendering:optimizelegibility;-webkit-font-smoothing:antialiased;}\n' +
  '    img {-ms-interpolation-mode: bicubic;}\n' +
  '    table {border-collapse: collapse; border-spacing: 0;}\n' +
  '\n' +
  '    @media (max-width: 480px) {\n' +
  '        div[class=aapl-mobile-div] {display: block !important;-webkit-text-size-adjust:none;height:100% !important;important;overflow:visible !important;max-height:none !important;min-height:none !important;line-height:normal !important;}\n' +
  '        div[class=aapl-desktop-div] {display: none !important;height:0;overflow:hidden !important;max-height:0;min-height:0;line-height:0}\n' +
  '    }\n' +
  '    @media only screen and (min-width: 768px) and (max-width: 1024px) {\n' +
  '        a {color:inherit}\n' +
  '    }\n' +
  '</style>\n' +
  '<br><br>\n' +
  '<table border="0" cellpadding="0" cellspacing="0" align="center" style="border-collapse:collapse;border-spacing:0;">\n' +
  '    <tr>\n' +
  '        <td valign="top">\n' +
  '            <div class="aapl-desktop-div" style="display:block;padding:0;margin:0;height:100%;max-height:none;min-height:none;line-height:normal;overflow:visible;">\n' +
  '                <table class="aapl-desktop-tbl" border="0" cellpadding="0" cellspacing="0" align="center" style="border-collapse:collapse;border-spacing:0;width:742px;">\n' +
  '                    <tr>\n' +
  '                        <td class="left-gutter" style="width:40px;"></td>\n' +
  '                        <td><img width="42" height="42" alt="Apple" src="https://s.mzstatic.com/email/images_shared/logo_apple_d-2x.png" border="0" style="border:none;padding:0;margin:0;-ms-interpolation-mode:bicubic;"></td>\n' +
  '                        <td ko-KR false  align="right" style="font-size:32px; font-weight:300; font-family: \'Helvetica Neue\', Helvetica, Arial, sans-serif; color: rgb(136,136,136)">영수증</td>\n' +
  '                        <td class="right-gutter" style="width:40px;"></td>\n' +
  '                    </tr>\n' +
  '                    <tr height="20"><td colspan="4"></td><tr>\n' +
  '\n' +
  '                    <tr>\n' +
  '                        <td colspan="4" align="center">\n' +
  '                            <table class="aapl-desktop-tbl" border="0" cellspacing="0" cellpadding="0" width="660" style="border-collapse:collapse;border-spacing:0;">\n' +
  '                                <tr>\n' +
  '                                    <td>\n' +
  '                                        <table class="aapl-desktop-tbl" border="0" bordercolor="#ffffff" cellpadding="0" cellspacing="0" style="border-collapse:collapse;border-spacing:0;color:rgb(51,51,51);background-color: rgb(250,250,250);border-radius:3px;font-size:12px;font-family:\'Helvetica Neue\',Helvetica,Arial,sans-serif;">\n' +
  '                                            <tr height="46">\n' +
  '                                                <td  width="320" colspan="2" style="padding-left:20px;border-style: solid;border-color: white;border-left-width:0;border-right-width:1px;border-bottom-width: 1px;border-top-width: 0px;"><span style="color:rgb(102,102,102);font-size:10px;">APPLE ID</span><br>jimmyjaeyeon@gmail.com</td>\n' +
  '                                                <td width="340" rowspan="3" style="padding-left:20px;border-style:solid;border-color:white;border-left-width:0px;border-right-width:0px;border-top-width:0px; border-bottom-width:0px;">\n' +
  '                                                    <span style="color:rgb(102,102,102);font-size:10px;">청구지 주소</span><br>\n' +
  '                                                    MasterCard .... 1228<br>            kimJaeyeon<br>\n' +
  '                                                    흥덕중앙로 105번길 24 동원로얄듀크 1005동 1502호<br>202호<br>용인시/기흥구,  경기도  446-908                                                        </td>\n' +
  '                                            </tr>\n' +
  '                                            <tr height="46">\n' +
  '                                                <td  colspan="2" style="padding-left:20px;border-style:solid; border-color:white;border-left-width:0;border-right-width:1px;border-bottom-width:1px;border-top-width:0px;"><span style="color:rgb(102,102,102);font-size:10px;">날짜</span><br>2019.07.29</td>\n' +
  '                                            </tr>\n' +
  '                                            <tr height="46">\n' +
  '                                                <td style="padding-left:20px;border-style:solid;border-color:white;border-left-width:0;border-right-width:1px;border-bottom-width:0px;border-top-width:0px;"><span style="color:rgb(102,102,102);font-size:10px;">주문 ID</span>r><span style="color:#0070c9;"><a href="https://xp.apple.com/report/2/its_mail_sf?responseType=redirect&emailType=invoice&lang=ko_kr&eventType=linkClick&redirectUrl=https%3A%2F%2Fsupport.apple.com%2Fkb%2FHT204088%3Fcid%3Demail_receipt_itunes_article_HT204088" target="_blank" rel="nofollow noopener">MMZVFL7XMM</a></span></td>\n' +
  '                                                <td style="padding-left:20px;border-style:solid;border-color:white;border-left-width:0;border-right-width:1px;border-bottom-width:0px;border-top-width:0px;"><span style="color:rgb(102,102,102);font-size:10px;">문서 번호</spar>197281619562</td>\n' +
  '                                            </tr>\n' +
  '                                        </table>\n' +
  '                                    </td>\n' +
  '                                </tr>\n' +
  '\n' +
  '                                <tr height="30"><td></td></tr>\n' +
  '                                <tr>\n' +
  '                                    <td>\n' +
  '                                        <table class="aapl-desktop-tbl" width="660" border="0" cellpadding="0" cellspacing="0" style="border-collapse:collapse;border-spacing:0;width:660px;color:rgb(51,51,51);font-size:12px;font-family:\'Helvetica Neue\',Helvetica,Arial,sans-serif;">\n' +
  '                                            <tr height="24" style="background-color: rgb(250,250,250);" class="section-header">\n' +
  '                                                <td colspan="2" width="350" style="width:350px;padding-left:10px;border-top-left-radius:3px;border-bottom-left-radius:3px;"><span style="font-size:14px;font-weight:500;">Apple 서비스</span></td>\n' +
  '                                                <td width="90" align="right" style="width:100px;padding:0 20px 0 0;position:relative;top:1;border-top-right-radius:3px;border-bottom-right-radius:3px;"><span style="color:rgb(102,102,102);font-size:10px;white-space:nowrap;">가격</span></td>\n' +
  '                                            </tr>\n' +
  '                                            <tr height="15"><td colspan="3"></td></tr>\n' +
  '                                            <tr style="max-height:114px;">\n' +
  '                                                <td width="64" class="artwork-cell" align="center" valign="top" style="padding: 0 0 0 20px;margin:0;width:64px;">\n' +
  '                                                    <img src="https://s.mzstatic.com/email/images_shared/dItemArtMusic_64_2x.jpg" width="64" height="64" border="0" alt="" style="padding:0;margin:0;-ms-interpolation-mode: bicubic;border:none;">\n' +
  '                                                </td>\n' +
  '                                                <td style="padding: 0 0 0 20px;line-height:15px;" class="item-cell">\n' +
  '                                                    <span class="title" style="font-weight:600;">Apple Music 구독 멤버십</span><br>\n' +
  '                                                    <span class="duration" style="color:rgb(102,102,102);">Apple Music 구독 멤버십(월별)</span><br>\n' +
  '                                                    <span class="renewal" style="color:rgb(102,102,102);">\n' +
  '      2019.08.28에 갱신 예정\n' +
  '            </span><br>\n' +
  '                                                    <span class="device" style="color:rgb(102,102,102);"> </span><br>      <span class="item-links" style="font-size:10px;">\n' +
  '                  </span>\n' +
  '                                                </td>\n' +
  '                                                <td width="100" class="price-cell" align="right" valign="top" style="padding:0 20px 0 0;padding-top:22px;width:100px;">\n' +
  '                                                    <span style="font-weight:600;white-space:nowrap;">￦8,900</span>\n' +
  '                                                </td>\n' +
  '                                            </tr>\n' +
  '                                        </table>\n' +
  '                                    </td>\n' +
  '                                </tr>\n' +
  '                                <tr>\n' +
  '                                    <td>\n' +
  '                                        <table class="aapl-desktop-tbl" width="660" border="0" cellpadding="0" cellspacing="0" style="border-collapse:collapse;border-spacing:0;width:660px;color:rgb(51,51,51);font-family:\'Helvetica Neue\',Helvetica,Arial,sans-serif;">\n' +
  '                                            <tr height="30"><td colspan="3"></td></tr>\n' +
  '                                            <tr height="1"><td height="1" colspan="3" style="padding:0 10px 0 10px;"><div style="line-height:1px;height:1px;background-color:rgb(238,238,238);"></div></td></tr>\n' +
  '                                            <tr height="48">\n' +
  '                                                <td align="right" style="color:rgb(102,102,102);font-size:10px;font-weight:600;padding: 0 30px 0 0;border-width:1px;border-color:rgb(238,238,238);">총계</td>\n' +
  '                                                <td width="1" style="background-color:rgb(238,238,238);width:1px;"></td>\n' +
  '                                                <td width="90" align="right" style="width:120px;padding:0 20px 0 0;font-size:16px;font-weight:600;white-space:nowrap;">\n' +
  '                                                    ￦8,900\n' +
  '                                                </td>\n' +
  '                                            </tr>\n' +
  '                                            <tr height="1"><td height="1" colspan="3" style="padding:0 10px 0 10px;"><div style="line-height:1px;height:1px;background-color:rgb(238,238,238);"></div></td></tr>\n' +
  '                                        </table>\n' +
  '                                    </td>\n' +
  '                                </tr>\n' +
  '                            </table>\n' +
  '                        </td>\n' +
  '                    </tr>\n' +
  '                    <tr class="footer-notice-spacer" style="height:20px"><td colspan="4"></td></tr>\n' +
  '                    <tr>\n' +
  '                        <td></td>\n' +
  '                        <td colspan="2" align="center" style="font-size:12px;font-family:\'Helvetica Neue\',Helvetica,Arial,sans-serif;color:rgb(102,102,102)">\n' +
  '                            구독 및 구입에 대한 도움을 받으십시오. <a href="https://support.apple.com/ko-kr/billing?cid=email_receipt">Apple 지원 바로가기</a></br></br>                    iTunes, Apple Books 및 App Store 구입과 관련된 <a href="ht204030?cid=email_receipt_itunes_article_HT204030">암호 환경설정 관리</a> 방법을 알아보십시오.<br><br>            국내 제휴 카드를 비롯한 국제 브랜드 신용 카드 및 직불 카드 사용 시 해당 카드사의 수수료가 청구될 수 있습니다. 수수료 관련d>\n' +
  '                        <td></td>\n' +
  '                    </tr>\n' +
  '                    <tr class="footer-spacer" style="height:40px"><td colspan="4"></td></tr><tr>\n' +
  '                    <td></td>\n' +
  '                    <td class="" colspan="2" align="center" style="font-size:12px; font-family: \'Helvetica Neue\',Helvetica,Arial,sans-serif; color: rgb(102,102,102)">\n' +
  '                        <img class="large-footer-logo" width="26" height="26" border="0" alt="Apple" src="https://s.mzstatic.com/email/images_shared/logo_apple_small_d-2x.png" style="border:none;padding:0;margin:0;-ms-interpolation-mode: bicubic;">\n' +
  '                        <img class="small-footer-logo" width="14" height="14" border="0" alt="Apple" src="https://s.mzstatic.com/email/images_shared/logo_apple_small_m-3x.png" style="display:none;border:none;padding:0;margin:0;-ms-interpolation-mode: bicubic;">\n' +
  '                    </td>\n' +
  '                    <td></td>\n' +
  '                </tr>\n' +
  '                    <tr height="8"><td colspan="4"></td></tr>\n' +
  '                    <tr>\n' +
  '                        <td></td>\n' +
  '                        <td colspan="2" align="center" style="font-size:12px; font-family: \'Helvetica Neue\',Helvetica,Arial,sans-serif; color: rgb(102,102,102)">\n' +
  '                            <a href="https://xp.apple.com/report/2/its_mail_sf?responseType=redirect&emailType=invoice&lang=ko_kr&eventType=linkClick&redirectUrl=https%3A%2F%2Fbuy.itunes.apple.com%2FWebObjects%2FMZFinance.woa%2Fwa%2FaccountSummary" style="color:#0073ff;">Apple ID 계정 정보</a> &#8226; <a href="https://xp.apple.com/report/2/its_mail_sf?responseType=redirect&emailType=invoice&lang=ko_kr&eventType=linkClick&redirectUrl=https%3A%2F%2Fwww.apple.com%2Flegal%2Fitunes%2Fappstorer%2Fterms.html%23SALE" style="color:#0073ff;">판매 약관</a> &#8226; <a href="https://xp.apple.com/report/2/its_mail_sf?responseType=redirect&emailType=invoice&lang=ko_kr&eventType=linkClick&redirectUrl=https%3A%2F%2Fwww.apple.com%2Fkrrivacy%2F" style="color:#0073ff;">개인정보 처리방침</a>\n' +
  '                        </td>\n' +
  '                        <td></td>\n' +
  '                    </tr>\n' +
  '                    <tr height="25"><td colspan="4"></td></tr>\n' +
  '                    <tr>\n' +
  '                        <td></td>\n' +
  '                        <td colspan="2" align="center" style="font-size:12px;font-family:\'Helvetica Neue\',Helvetica,Arial,sans-serif;color:rgb(102,102,102)">\n' +
  '                            Copyright © 2019 Apple Distribution International<br><a href="https://xp.apple.com/report/2/its_mail_sf?responseType=redirect&emailType=invoice&lang=ko_kr&eventType=linkClick&redirectUrl=https%3A%2F%2Fwww.apple.com%2Flegal%2F" style="color:#1187FF">모든 권리 보유</a>\n' +
  '                            <br><span class="legal-entity">\n' +
  '      Hollyhill Industrial Estate, Hollyhill, Cork, Ireland\n' +
  '      </span>\n' +
  '                        </td>\n' +
  '                        <td></td>\n' +
  '                    </tr>\n' +
  '                    <tr height="25"><td colspan="4" height="30"></td></tr>\n' +
  '                </table>\n' +
  '            </div>\n' +
  '\n' +
  '\n' +
  '\n' +
  '            <div class="aapl-mobile-div" style="display:none;padding:0;margin:0;height:0;max-height:0;min-height:none;line-height:0;overflow:hidden;">\n' +
  '                <table class="aapl-mobile-tbl" border="0" cellpadding="0" cellspacing="0" width="480" align="center" style="border-collapse:collapse;border-spacing:0;">\n' +
  '                    <tr>\n' +
  '                        <td class="aapl-mobile-cell" width="15" style=""></td>\n' +
  '                        <td class="aapl-mobile-cell"><img width="22" height="22" alt="Apple" src="https://s.mzstatic.com/email/images_shared/logo_apple_m-3x.png" border="0" style="border:none;padding:0;margin:0;"></td>\n' +
  '                        <td class="aapl-mobile-cell"ko-KR false  align="right" style="font-size:32px; font-family: \'Helvetica Neue\', Helvetica, Arial, sans-serif; color: rgb(136,136,136);">영수증</td>\n' +
  '                        <td class="aapl-mobile-cell" width="15" style=""></td>\n' +
  '                    </tr>\n' +
  '                    <tr height="15"><td class="aapl-mobile-cell" colspan="4" style=""></td><tr>\n' +
  '                    <tr>\n' +
  '                        <td class="aapl-mobile-cell" colspan="4" align="center" style="">\n' +
  '                            <table class="aapl-mobile-tbl" border="0" cellspacing="0" cellpadding="0" width="450" style="border-collapse:collapse;border-spacing:0;">\n' +
  '                                <tr>\n' +
  '                                    <td class="aapl-mobile-cell" style="">\n' +
  '                                        <table class="aapl-mobile-tbl" border="0" bordercolor="#ffffff" cellpadding="0" cellspacing="0" style="border-collapse:collapse;border-spacing:0;color:rgb(51,51,51);background-color: rgb(250,250,250);border-radius:3px;font-size:12px;font-family:\'Helvetica Neue\',Helvetica,Arial,sans-serif;border-color:#ffffff;border-style:solid;border-top-color:#ffffff;border-bottom-color:#ffffff;">\n' +
  '                                            <tr height="44">\n' +
  '                                                <td  colspan="2" class="aapl-mobile-cell" style="padding-left:15px;border-style:solid;border-color:#ffffff;border-top-width:0px; border-left-width:0;border-right-width:0 border-bottom-width:1px;">\n' +
  '                                                    <span style="color:rgb(102,102,102);font-size:10px;font-weight:600;">APPLE ID</span><br><span style="color:#0073ff;">jimmyjaeyeon@gmail.com</span>\n' +
  '                                                </td>\n' +
  '                                            </tr>\n' +
  '                                            <tr height="44">\n' +
  '                                                <td class="aapl-mobile-cell" width="225" style="padding-left:15px;border-style:solid;border-color:#ffffff;border-top-width:0px;border-left-width:0;border-right-width:1px;border-bottom-width:1px;">\n' +
  '                                                    <span style="color:rgb(102,102,102);font-size:10px;font-weight:600;">주문 ID</span><br><span style="color:#0070c9;">MMZVFL7XMM</span>          </td>\n' +
  '                                                <td class="aapl-mobile-cell" width="225" style="padding-left:15px;border-style:solid;border-color:#ffffff;border-top-width:0px;border-left-width:0;border-right-width:0;border-bottom-width:1px;">\n' +
  '            <span style="color:rgb(102,102,102);font-size:10px;font-weight:600;">\n' +
  '                              문서 번호</span><br>197281619562\n' +
  '                                                </td>\n' +
  '                                            </tr>\n' +
  '                                            <tr height="44">\n' +
  '                                                <td colspan="2" class="aapl-mobile-cell" style="padding-left:15px;border-style:solid;border-color:#ffffff;border-top-width:0px;border-left-width:0;border-right-width:1px;border-bottom-width:1px;">\n' +
  '                                                    <span style="color:rgb(102,102,102);font-size:10px;font-weight:600;">날짜</span><br>2019.07.29          </td>\n' +
  '                                            </tr>\n' +
  '\n' +
  '                                            <tr height="90">\n' +
  '                                                <td class="aapl-mobile-cell" colspan="2" style="padding-left:15px;padding-right:15px;border-style:solid;border-color:#ffffff;border-top-width:0px;border-left-width:0;border-right-width:0;border-bottom-width:0px;padding-top:8px;padding-bottom:8px;">\n' +
  '                                                    <span style="color:rgb(102,102,102);font-size:10px;font-weight:600;">청구지 주소</span><br>\n' +
  '                                                    MasterCard .... 1228<br>            kimJaeyeon<br>\n' +
  '                                                    흥덕중앙로 105번길 24 동원로얄듀크 1005동 1502호<br>202호<br>용인시/기흥구,  경기도  446-908                                              </td>\n' +
  '                                            </tr>\n' +
  '                                        </table>\n' +
  '                                    </td>\n' +
  '                                </tr>\n' +
  '\n' +
  '                                <tr height="20"><td class="aapl-mobile-cell" style=""></td></tr>\n' +
  '                                <tr>\n' +
  '                                    <td width="450" class="aapl-mobile-cell" style="">\n' +
  '                                        <table class="aapl-mobile-tbl" border="0" cellpadding="0" cellspacing="0" style="border-collapse:collapse;border-spacing:0;width:100%;color:rgb(51,51,51);font-size:12px;font-family:\'Helvetica Neue\',Helvetica,Arial,sans-serif;">\n' +
  '                                            <tr height="24" style="background-color:rgb(250,250,250);" class="section-header">\n' +
  '                                                <td class="aapl-mobile-cell" colspan="2" style="padding-left:15px;"><span style="font-size:11px;font-weight:600;">Apple 서비스</span></td>\n' +
  '                                                <td width="90" align="right" style="width:90px;padding-right:15px;position:relative;top:1;"><span style="color:rgb(102,102,102);font-size:10px;white-space:nowrap;">가격</span></td>\n' +
  '                                            </tr>\n' +
  '                                            <tr height="15"><td colspan="3"></td></tr>\n' +
  '                                            <tr style="max-height:114px;">\n' +
  '                                                <td width="75" class="artwork-cell aapl-mobile-cell" align="center" valign="top" style="padding: 0 0 0 15px;margin:0;width:64px;">\n' +
  '                                                    <img src="https://s.mzstatic.com/email/images_shared/dItemArtMusic_64_2x.jpg" width="64" height="64" border="0" alt="" style="padding:0;margin:0;-ms-interpolation-mode: bicubic;border:none;">\n' +
  '                                                </td>\n' +
  '                                                <td style="padding: 0 0 0 15px;line-height:15px;" class="item-cell aapl-mobile-cell">\n' +
  '                                                    <span class="title" style="font-weight:600;">Apple Music 구독 멤버십</span><br>\n' +
  '                                                    <span class="duration" style="color:rgb(102,102,102); font-size:10px;">Apple Music 구독 멤버십(월별)</span><br>\n' +
  '                                                    <span class="renewal" style="color:rgb(102,102,102); font-size:10px;">\n' +
  '      2019.08.28에 갱신 예정\n' +
  '            </span><br>\n' +
  '                                                    <span class="device" style="color:rgb(102,102,102); font-size:10px;"> </span><br>      <span class="item-links" style="font-size:10px;">\n' +
  '                  </span>\n' +
  '                                                </td>\n' +
  '                                                <td width="100" class="price-cell aapl-mobile-cell" align="right" valign="top" style="padding-right:15px;padding-top:22px;width:100px;">\n' +
  '                                                    <span style="font-weight:600;white-space:nowrap;">￦8,900</span>\n' +
  '                                                </td>\n' +
  '                                            </tr>\n' +
  '                                        </table>\n' +
  '                                    </td>\n' +
  '                                </tr>\n' +
  '                                <tr>\n' +
  '                                    <td class="aapl-mobile-cell" style="">\n' +
  '                                        <table class="aapl-mobile-tbl" width="450" border="0" cellpadding="0" cellspacing="0" style="width:450px;color:rgb(51,51,51);font-family:\'Helvetica Neue\',Helvetica,Arial,sans-serif;">\n' +
  '                                            <tr height="30"><td class="aapl-mobile-cell" colspan="2" style=""></td></tr>\n' +
  '                                            <tr height="1"><td class="aapl-mobile-cell" height="1" colspan="2" style="padding:0 10px 0 10px;"><div style="line-height:1px;height:1px;background-color:rgb(238,238,238);"></div></td></tr>\n' +
  '                                            <tr height="48">\n' +
  '                                                <td class="aapl-mobile-cell" style="padding-left:15px;color:rgb(102,102,102);font-size:10px;font-weight:600;">총계</td>\n' +
  '                                                <td class="aapl-mobile-cell" width="120" align="right" style="width:120px;padding-right:15px;font-size:16px;font-weight:600;white-space:nowrap;">\n' +
  '                                                    ￦8,900\n' +
  '                                                </td>\n' +
  '                                            </tr>\n' +
  '                                            <tr height="1"><td class="aapl-mobile-cell" height="1" colspan="2" style="padding:0 10px 0 10px;"><div style="line-height:1px;height:1px;background-color:rgb(238,238,238);"></div></td></tr>\n' +
  '                                        </table>\n' +
  '                                    </td>\n' +
  '                                </tr>\n' +
  '\n' +
  '                            </table>\n' +
  '                        </td>\n' +
  '                    </tr>\n' +
  '                    <tr height="15"><td colspan="4" class="aapl-mobile-cell" style=""></td></tr>\n' +
  '                    <tr>\n' +
  '                        <td class="aapl-mobile-cell" style=""></td>\n' +
  '                        <td class="aapl-mobile-cell" colspan="2" align="center" style="font-size:12px;font-family:\'Helvetica Neue\',Helvetica,Arial,sans-serif;color:rgb(102,102,102);">\n' +
  '                            구독 및 구입에 대한 도움을 받으십시오. <a href="https://support.apple.com/ko-kr/billing?cid=email_receipt">Apple 지원 바로가기</a></br></br>                    iTunes, Apple Books 및 App Store 구입과 관련된 <a href="https:30?cid=email_receipt_itunes_article_HT204030">암호 환경설정 관리</a> 방법을 알아보십시오.<br><br>        국내 제휴 카드를 비롯한 국제 브랜드 신용 카드 및 직불 카드 사용 시 해당 카드사의 수수료가 청구될 수 있습니다. 수수료 관련 질문이 td>\n' +
  '                        <td class="aapl-mobile-cell" style="display:none;max-height:0;line-height:0;mso-hide:all;"></td>\n' +
  '                    </tr>\n' +
  '                    <tr height="25"><td colspan="4" class="aapl-mobile-cell" style=""></td></tr>\n' +
  '                    <tr>\n' +
  '                        <td class="aapl-mobile-cell" style=""></td>\n' +
  '                        <td class="aapl-mobile-cell" colspan="2" align="center" style="font-size:12px; font-family: \'Helvetica Neue\',Helvetica,Arial,sans-serif; color: rgb(102,102,102);">\n' +
  '                            <img width="14" height="14" border="0" alt="" src="https://s.mzstatic.com/email/images_shared/logo_apple_small_m-3x.png" style="border:none;padding:0;margin:0;-ms-interpolation-mode: bicubic;">\n' +
  '                        </td>\n' +
  '                        <td class="aapl-mobile-cell" style=""></td>\n' +
  '                    </tr>\n' +
  '                    <tr height="8"><td class="aapl-mobile-cell" colspan="4" style=""></td></tr>\n' +
  '                    <tr>\n' +
  '                        <td class="aapl-mobile-cell" style=""></td>\n' +
  '                        <td class="aapl-mobile-cell" colspan="2" align="center" style="font-size:12px; font-family: \'Helvetica Neue\',Helvetica,Arial,sans-serif; color: rgb(102,102,102);">\n' +
  '                            <a href="https://buy.itunes.apple.com/WebObjects/MZFinance.woa/wa/accountSummary" style="color:#0073ff;">Apple ID 계정 정보</a> &#8226; <a href="https://xp.apple.com/report/2/its_mail_sf?responseType=redirect&emailType=invoice&lan_kr&eventType=linkClick&redirectUrl=https%3A%2F%2Fwww.apple.com%2Flegal%2Fitunes%2Fappstore%2Fkr%2Fterms.html%23SALE" style="color:#0073ff;">판매 약관</a> &#8226; <a href="https://xp.apple.com/report/2/its_mail_sf?responseType=redirecailType=invoice&lang=ko_kr&eventType=linkClick&redirectUrl=https%3A%2F%2Fwww.apple.com%2Fkr%2Fprivacy%2F" style="color:#0073ff;">개인정보 처리방침</a>\n' +
  '                        </td>\n' +
  '                        <td class="aapl-mobile-cell" style=""></td>\n' +
  '                    </tr>\n' +
  '                    <tr height="25"><td colspan="4" class="aapl-mobile-cell" style=""></td></tr>\n' +
  '                    <tr>\n' +
  '                        <td class="aapl-mobile-cell" style=""></td>\n' +
  '                        <td class="aapl-mobile-cell" colspan="2" align="center" style="font-size:12px;font-family:\'Helvetica Neue\',Helvetica,Arial,sans-serif;color:rgb(102,102,102);">\n' +
  '                            Copyright © 2019 Apple Distribution International<br><a href="https://xp.apple.com/report/2/its_mail_sf?responseType=redirect&emailType=invoice&lang=ko_kr&eventType=linkClick&redirectUrl=https%3A%2F%2Fwww.apple.com%2Flegal%2F" style="color:#0073ff">모든 권리 보유</a>\n' +
  '                            <br><span class="legal-entity">\n' +
  '      Hollyhill Industrial Estate, Hollyhill, Cork, Ireland\n' +
  '      </span>\n' +
  '                        </td>\n' +
  '                        <td class="aapl-mobile-cell" style=""></td>\n' +
  '                    </tr>\n' +
  '                    <tr height="25"><td colspan="4" height="30" class="aapl-mobile-cell" style=""></td></tr>\n' +
  '                </table>\n' +
  '            </div>\n' +
  '\n' +
  '\n' +
  '\n' +
  '        </td>\n' +
  '    </tr>\n' +
  '</table>\n' +
  '<img border="0" alt="" width="1" height="1" src="https://xp.apple.com/report/2/its_mail_sf?responseType=image&emailType=invoice&lang=ko_kr&eventType=open" style="border:none;display:none;" />  <br><br>\n' +
  '</body>\n' +
  '<img src=\'http://outsideapple.apple.com/img/APPLE_EMAIL_LINK/spacer4.gif?v=2&a=%2FreOOAuRz3hYhvues6ZpFYGTtfwnesWmzfenSEy1eEBkyXJUnAIbeIpFUZKopOOYxn%2FAhYmapYLKswVqgDv0Ts9cjfEpg0M428FMCQMTT4ZwShXfOaVONHng6qwD%2FPiaAR%2F5EcTgyChlKIC0XBgOJp7CacHOf1NsrnaJl9ERLRX74VK87lcKw1yV35rTKXiHY8l3de%2BRXIczCHvzA4NH2DZ7g6FjPmhNeo74IoqFn4uwpdNnmdEOr3%2BC4XmeBWSmul2U3btQ1sEw2eSHoG76X%2FX8VbmAII1EtjtrlqWLeSnmTZFAgQvMHav5ziMj197WK3qnj19lb2cC3desujF39HLG6crxN0Z47sufz%2FMBg27xtgyZ8FFe8r5fn1JMj8%2FZPxLuTzp6%2ByjIxizIU1dSXMEt75FVKloKhX6F%2BpySnAY%2BKl8FcCQIU6Gdkx5GG0hN\'/>\n' +
  '</html>\n'

var parser = new Domparser();
var wrapper = parser.parseFromString(test, 'text/html');
const $ = cheerio.load(wrapper.rawHTML);
const name = $('span[class=title]');
const duration = $('span[class=duration]');
const renewal = $('span[class=renewal]');
const id = $('body > table:nth-child(4) > tbody > tr > td > div.aapl-desktop-div > table > tbody > tr:nth-child(4) > td > table > tbody > tr:nth-child(1) > td > table > tbody > tr:nth-child(1) > td:nth-child(1)');

console.log(name.contents().get("0").data);
console.log(renewal.contents().get("0").data.trim());
console.log(duration.contents().get("0").data);
console.log(id.text());


