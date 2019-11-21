import moment from 'moment';

const createHtml = (month, userSubscriptions) => {

  const subscriptionList = createsubscriptionList(userSubscriptions);

  let subscount = 0;
  let totalPrice = 0;

  userSubscriptions.forEach((element) =>{
    subscount++;
    totalPrice += Number(element.price);
  });

  const averagePrice = Math.round((totalPrice / subscount) /10 )*10;

  const ReportHtml = `
<html lang="ko"
      style="box-sizing: border-box;font-family: sans-serif;line-height: 1.15;-webkit-text-size-adjust: 100%;-webkit-tap-highlight-color: rgba(0, 0, 0, 0);width: 100%;height: 100%;-ms-text-size-adjust: 100%;-ms-overflow-style: scrollbar;--antd-wave-shadow-color: #1890ff;">
<head style="box-sizing: border-box;">
    <meta charset="UTF-8" style="box-sizing: border-box;">

    <meta name="viewport" content="width=device-width, initial-scale=1, maximum-scale=1, user-scalable=no"
          style="box-sizing: border-box;">
    <meta name="google-signin-client_id"
          content="532345922072-50gar7lh5ca5rvepjs7iisa6lu28d741.apps.googleusercontent.com"
          style="box-sizing: border-box;">


<body cz-shortcut-listen="true"
      style="box-sizing: border-box;margin: 0;font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', 'PingFang SC', 'Hiragino Sans GB', 'Microsoft YaHei', 'Helvetica Neue', Helvetica, Arial, sans-serif, 'Apple Color Emoji', 'Segoe UI Emoji', 'Segoe UI Symbol';font-size: 14px;font-weight: 400;line-height: 1.5;color: rgba(0, 0, 0, 0.65);text-align: left;background-color: #fff;width: 100%;height: 100%;font-variant: tabular-nums;font-feature-settings: 'tnum';">
<script src="https://apis.google.com/_/scs/apps-static/_/js/k=oz.gapi.ko.i0HJi8wgKc4.O/m=auth2/rt=j/sv=1/d=1/ed=1/am=wQE/rs=AGLTcCO9OR7IX1zv981pSIxRKWC2BzTLSA/cb=gapi.loaded_0"
        async="" style="box-sizing: border-box;"></script>
<div id="root" style="box-sizing: border-box;height: 100%;width: 100%;">
    <div class="layout"
         style="box-sizing: border-box;min-height: 100%;display: flex;flex-direction: column;height: 100%;background-color: #f4f4f4;">

        <div class="router" style="box-sizing: border-box;background-color: #f4f4f4;">
            <div class="container main-container"
                 style="box-sizing: border-box;width: 100%;padding-right: 15px;padding-left: 15px;margin-right: auto;margin-left: auto;min-width: 992px!important;">
                <div class="row"
                     style="box-sizing: border-box;display: flex;-ms-flex-wrap: wrap;flex-wrap: wrap;margin-right: 0;margin-left: 0;">
                    <div class="col-sm-6 report-container report-inner-container"
                         style="box-sizing: border-box;position: relative;width: 100%;padding-right: 15px;padding-left: 15px;-ms-flex: 0 0 50%;flex: 0 0 50%;max-width: 50%;text-align: center;box-shadow: 0vh 0vh 10px 10px #f3f3f3;background: #ffffff;border-radius: 2vh;font-weight: lighter;font-size: 1vw;padding: 5vh;margin: 5vh auto 5vh auto;">
                        <div class="col-sm phone-report-inner"
                             style="box-sizing: border-box;position: relative;width: 100%;padding-right: 15px;padding-left: 15px;">
                            <div class="row justify-content-md-center"
                                 style="box-sizing: border-box;display: flex;-ms-flex-wrap: wrap;flex-wrap: wrap;margin-right: 0;margin-left: 0;-ms-flex-pack: center!important;justify-content: center!important;">
                                <div class="col-2"
                                     style="box-sizing: border-box;position: relative;width: 100%;padding-right: 15px;padding-left: 15px;-ms-flex: 0 0 16.666667%;flex: 0 0 16.666667%;max-width: 16.666667%;text-align: center;">
                                    <img class="report-logoImg"
                                         src="https://moneydog.s3.ap-northeast-2.amazonaws.com/resource/img/MDBlackIcon.png"
                                         alt="Generic placeholder image"
                                         style="box-sizing: border-box;vertical-align: middle;border-style: none;page-break-inside: avoid;width: 5vh;">
                                </div>
                                <div class="col-10 align-self-center text-left"
                                     style="box-sizing: border-box;position: relative;width: 100%;padding-right: 15px;padding-left: 15px;-ms-flex: 0 0 83.333333%;flex: 0 0 83.333333%;max-width: 83.333333%;text-align: left!important;-ms-flex-item-align: center!important;align-self: center!important;">
                                    <div class="report-title"
                                         style="box-sizing: border-box;color: black;font-size: 3vh;font-family: 'Spoqa Han Sans Bold';">
                                        &nbsp;${month}월 머니독 리포트
                                    </div>
                                </div>
                            </div>
                            <div class="report-padding" style="box-sizing: border-box;padding-top: 5vh;">
                                <div class="row"
                                     style="box-sizing: border-box;display: flex;-ms-flex-wrap: wrap;flex-wrap: wrap;margin-right: 0;margin-left: 0;">
                                    <div class="padding-zero col"
                                         style="box-sizing: border-box;position: relative;width: 100%;padding-right: 15px;padding-left: 15px;-ms-flex-preferred-size: 0;flex-basis: 0;-ms-flex-positive: 1;flex-grow: 1;max-width: 100%;margin: auto;height: auto;padding: 0;text-align: center;">
                                        <div class="row montlyReport-subs-text"
                                             style="box-sizing: border-box;display: flex;-ms-flex-wrap: wrap;flex-wrap: wrap;margin-right: 0;margin-left: 0;background-color: #f4f4f4;border-radius: 1vh;color: black;font-family: 'Montserrat-Regular';padding: 3vh 0 3vh 0;">
                                            <div class="col padding-zero"
                                                 style="box-sizing: border-box;position: relative;width: 100%;padding-right: 15px;padding-left: 15px;-ms-flex-preferred-size: 0;flex-basis: 0;-ms-flex-positive: 1;flex-grow: 1;max-width: 100%;margin: auto;height: auto;padding: 0;text-align: center;">
                                                <div class="montlyReport-subs-header"
                                                     style="box-sizing: border-box;font-family: 'Spoqa Han Sans Bold';font-size: 2vh;">
                                                    총 구독앱수
                                                </div>
                                                <div class="montlyReport-subs-body"
                                                     style="box-sizing: border-box;font-size: 3vh;"> ${subscount}개
                                                </div>
                                            </div>
                                            <div class="col padding-zero"
                                                 style="box-sizing: border-box;position: relative;width: 100%;padding-right: 15px;padding-left: 15px;-ms-flex-preferred-size: 0;flex-basis: 0;-ms-flex-positive: 1;flex-grow: 1;max-width: 100%;margin: auto;height: auto;padding: 0;text-align: center;">
                                                <div class="montlyReport-subs-header"
                                                     style="box-sizing: border-box;font-family: 'Spoqa Han Sans Bold';font-size: 2vh;">
                                                    평균 구독가격
                                                </div>
                                                <div class="montlyReport-subs-body"
                                                     style="box-sizing: border-box;font-size: 3vh;">${averagePrice}원
                                                </div>
                                            </div>
                                            <div class="col padding-zero"
                                                 style="box-sizing: border-box;position: relative;width: 100%;padding-right: 15px;padding-left: 15px;-ms-flex-preferred-size: 0;flex-basis: 0;-ms-flex-positive: 1;flex-grow: 1;max-width: 100%;margin: auto;height: auto;padding: 0;text-align: center;">
                                                <div class="montlyReport-subs-header"
                                                     style="box-sizing: border-box;font-family: 'Spoqa Han Sans Bold';font-size: 2vh;">
                                                    결제 총액
                                                </div>
                                                <div class="montlyReport-subs-body"
                                                     style="box-sizing: border-box;font-size: 3vh;">${totalPrice}원
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </div>
<!--                            <div class="report-padding" style="box-sizing: border-box;padding-top: 5vh;">-->
<!--                                <div class="justify-content-md-center row"-->
<!--                                     style="box-sizing: border-box;display: flex;-ms-flex-wrap: wrap;flex-wrap: wrap;margin-right: 0;margin-left: 0;-ms-flex-pack: center!important;justify-content: center!important;">-->
<!--                                    <div class="padding-zero col"-->
<!--                                         style="box-sizing: border-box;position: relative;width: 100%;padding-right: 15px;padding-left: 15px;-ms-flex-preferred-size: 0;flex-basis: 0;-ms-flex-positive: 1;flex-grow: 1;max-width: 100%;margin: auto;height: auto;padding: 0;text-align: center;">-->
<!--                                        <div class="report-subtitle"-->
<!--                                             style="box-sizing: border-box;font-family: 'Spoqa Han Sans Bold';font-size: 2vh;color: #000000;text-align: center;padding-bottom: 1vh;">-->
<!--                                            지난 3개월간 사용량 비교-->
<!--                                        </div>-->
<!--                                        <div class="row report-content"-->
<!--                                             style="box-sizing: border-box;display: flex;-ms-flex-wrap: wrap;flex-wrap: wrap;margin-right: 0;margin-left: 0;font-family: 'Montserrat-Regular';">-->
<!--                                            <div class="col-sm-4"-->
<!--                                                 style="box-sizing: border-box;position: relative;width: 100%;padding-right: 15px;padding-left: 15px;-ms-flex: 0 0 33.333333%;flex: 0 0 33.333333%;max-width: 33.333333%;text-align: center;">-->
<!--                                                <div style="box-sizing: border-box;">9월</div>-->
<!--                                                <div style="box-sizing: border-box;">-->
<!--                                                    <iframe class="chartjs-hidden-iframe" tabindex="-1"-->
<!--                                                            style="display: block;overflow: hidden;border: 0px;margin: 0px;top: 0px;left: 0px;bottom: 0px;right: 0px;height: 100%;width: 100%;position: absolute;pointer-events: none;z-index: -1;box-sizing: border-box;"></iframe>-->
<!--                                                    <canvas id="myChart1" width="228" height="300"-->
<!--                                                            style="display: block;width: 114px;height: 150px;box-sizing: border-box;"></canvas>-->
<!--                                                </div>-->
<!--                                            </div>-->
<!--                                            <div class="col-sm-4"-->
<!--                                                 style="box-sizing: border-box;position: relative;width: 100%;padding-right: 15px;padding-left: 15px;-ms-flex: 0 0 33.333333%;flex: 0 0 33.333333%;max-width: 33.333333%;text-align: center;">-->
<!--                                                <div style="box-sizing: border-box;">10월</div>-->
<!--                                                <div style="box-sizing: border-box;">-->
<!--                                                    <iframe class="chartjs-hidden-iframe" tabindex="-1"-->
<!--                                                            style="display: block;overflow: hidden;border: 0px;margin: 0px;top: 0px;left: 0px;bottom: 0px;right: 0px;height: 100%;width: 100%;position: absolute;pointer-events: none;z-index: -1;box-sizing: border-box;"></iframe>-->
<!--                                                    <canvas id="myChart2" width="228" height="300"-->
<!--                                                            style="display: block;width: 114px;height: 150px;box-sizing: border-box;"></canvas>-->
<!--                                                </div>-->
<!--                                            </div>-->
<!--                                            <div class="col-sm-4"-->
<!--                                                 style="box-sizing: border-box;position: relative;width: 100%;padding-right: 15px;padding-left: 15px;-ms-flex: 0 0 33.333333%;flex: 0 0 33.333333%;max-width: 33.333333%;text-align: center;">-->
<!--                                                <div style="box-sizing: border-box;">11월</div>-->
<!--                                                <div style="box-sizing: border-box;">-->
<!--                                                    <iframe class="chartjs-hidden-iframe" tabindex="-1"-->
<!--                                                            style="display: block;overflow: hidden;border: 0px;margin: 0px;top: 0px;left: 0px;bottom: 0px;right: 0px;height: 100%;width: 100%;position: absolute;pointer-events: none;z-index: -1;box-sizing: border-box;"></iframe>-->
<!--                                                    <canvas id="myChart3" width="228" height="300"-->
<!--                                                            style="display: block;width: 114px;height: 150px;box-sizing: border-box;"></canvas>-->
<!--                                                </div>-->
<!--                                            </div>-->
<!--                                        </div>-->
<!--                                    </div>-->
<!--                                </div>-->
<!--                            </div>-->
                            <div class="report-padding" style="box-sizing: border-box;padding-top: 5vh;">
                                <div class="report-subtitle"
                                     style="box-sizing: border-box;font-family: 'Spoqa Han Sans Bold';font-size: 2vh;color: #000000;text-align: center;padding-bottom: 1vh;">
                                    ${month}월 구독 리스트
                                </div>
                                

                                ${subscriptionList}

                                
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    </div>
</div>
</body>
</html>
`;

  return ReportHtml;
};

const createsubscriptionList = (userSubscriptions) => {

  let userSubscriptionslist = '';

  userSubscriptions.forEach((element) => {

    if (element.logoURI !== '') {

      userSubscriptionslist += `
   <div class="row"
style="box-sizing: border-box;display: flex;-ms-flex-wrap: wrap;flex-wrap: wrap;margin-right: 0;margin-left: 0;">
    <div class="col-2 subscribe-img-element align-self-center padding-zero"
style="box-sizing: border-box;position: relative;width: 100%;padding-right: 15px;padding-left: 15px;-ms-flex: 0 0 16.666667%;flex: 0 0 16.666667%;max-width: 16.666667%;text-align: center;padding: 0;-ms-flex-item-align: center!important;align-self: center!important;">
    <div class="col-sm padding-zero"
style="box-sizing: border-box;position: relative;width: 100%;padding-right: 15px;padding-left: 15px;padding: 0;text-align: left;">
    <img class="list-logo-img"
src="https://moneydog.s3.ap-northeast-2.amazonaws.com/resource${element.logoURI}"
alt="x"
style="box-sizing: border-box;vertical-align: middle;border-style: none;page-break-inside: avoid;height: 5vh;border: 1px solid #f3f3f3;border-radius: 5px;">
    </div>
    </div>
    <div class="col subscribe-element item-border align-self-center"
style="box-sizing: border-box;position: relative;width: 100%;padding-right: 15px;padding-left: 15px;-ms-flex-preferred-size: 0;flex-basis: 0;-ms-flex-positive: 1;flex-grow: 1;max-width: 100%;margin: 0;height: auto;text-align: center;padding: 2vh 0 2vh 0;border-bottom: 1px solid #d8d8d8;vertical-align: center;-ms-flex-item-align: center!important;align-self: center!important;">
    <div class="container w-100 align-self-center padding-zero" style="box-sizing: border-box;width: 100%!important;padding-right: 15px;padding-left: 15px;margin-right: auto;margin-left: auto;padding: 0;text-align: left;/* min-width: 992px!important; */-ms-flex-item-align: center!important;align-self: center!important;">
    <div class="row textfamily" style="box-sizing: border-box;display: flex;-ms-flex-wrap: wrap;flex-wrap: wrap;margin-right: 0;margin-left: 0;font-size: 1.5vh;font-family: 'Spoqa Han Sans Regular';letter-spacing: -1px;">
    <div class="col item-name text-left item-bold padding-one align-self-center" style="box-sizing: border-box;position: relative;width: 100%;padding-right: 15px;padding-left: 15px;-ms-flex-preferred-size: 0;flex-basis: 0;-ms-flex-positive: 1;flex-grow: 1;max-width: 100%;margin: auto;height: auto;color: black;font-weight: bold;font-size: 2vh;padding: 0 0 0 1vh;text-align: left!important;-ms-flex-item-align: center!important;align-self: center!important;">
    ${element.name}
    </div>
    <div class="col padding-zero text-left align-self-center" style="box-sizing: border-box;position: relative;width: 100%;padding-right: 15px;padding-left: 15px;-ms-flex-preferred-size: 0;flex-basis: 0;-ms-flex-positive: 1;flex-grow: 1;max-width: 100%;margin: auto;height: auto;padding: 0;text-align: left!important;-ms-flex-item-align: center!important;align-self: center!important;">
    엔터테인먼트
    </div>
    <div class="col-3 item-bold padding-zero text-right align-self-center" style="box-sizing: border-box;position: relative;width: 100%;padding-right: 15px;padding-left: 15px;-ms-flex: 0 0 25%;flex: 0 0 25%;max-width: 25%;color: black;font-weight: bold;font-size: 2vh;padding: 0;text-align: right!important;-ms-flex-item-align: center!important;align-self: center!important;">
    월 ${element.price}원
</div>
<div class="col-2 padding-zero text-right align-self-center" style="box-sizing: border-box;position: relative;width: 100%;padding-right: 15px;padding-left: 15px;-ms-flex: 0 0 16.666667%;flex: 0 0 16.666667%;max-width: 16.666667%;padding: 0;text-align: right!important;-ms-flex-item-align: center!important;align-self: center!important;">
    매달 ${moment(element.paymentDate, 'YYYY-MM-DD').date()}일
</div>
</div>
</div>
</div>
</div>
    `;
    } else {
      userSubscriptionslist += `
   <div class="row"
style="box-sizing: border-box;display: flex;-ms-flex-wrap: wrap;flex-wrap: wrap;margin-right: 0;margin-left: 0;">
    <div class="col-2 subscribe-img-element align-self-center padding-zero"
style="box-sizing: border-box;position: relative;width: 100%;padding-right: 15px;padding-left: 15px;-ms-flex: 0 0 16.666667%;flex: 0 0 16.666667%;max-width: 16.666667%;text-align: center;padding: 0;-ms-flex-item-align: center!important;align-self: center!important;">
    <div class="col-sm padding-zero"
style="box-sizing: border-box;position: relative;width: 100%;padding-right: 15px;padding-left: 15px;padding: 0;text-align: left;">
    <button class="logo-Btn"
                                                    style="background: rgb(213, 252, 120);box-sizing: border-box;border-radius: 5px;margin: 0;font-family: monospace;font-size: 3vh;line-height: inherit;overflow: visible;text-transform: none;-webkit-appearance: button;touch-action: manipulation;color: inherit;height: 5vh;width: 5vh;border: 0;">
                                                ${element.name[0]}
                                            </button>
    </div>
    </div>
    <div class="col subscribe-element item-border align-self-center"
style="box-sizing: border-box;position: relative;width: 100%;padding-right: 15px;padding-left: 15px;-ms-flex-preferred-size: 0;flex-basis: 0;-ms-flex-positive: 1;flex-grow: 1;max-width: 100%;margin: 0;height: auto;text-align: center;padding: 2vh 0 2vh 0;border-bottom: 1px solid #d8d8d8;vertical-align: center;-ms-flex-item-align: center!important;align-self: center!important;">
    <div class="container w-100 align-self-center padding-zero" style="box-sizing: border-box;width: 100%!important;padding-right: 15px;padding-left: 15px;margin-right: auto;margin-left: auto;padding: 0;text-align: left;/* min-width: 992px!important; */-ms-flex-item-align: center!important;align-self: center!important;">
    <div class="row textfamily" style="box-sizing: border-box;display: flex;-ms-flex-wrap: wrap;flex-wrap: wrap;margin-right: 0;margin-left: 0;font-size: 1.5vh;font-family: 'Spoqa Han Sans Regular';letter-spacing: -1px;">
    <div class="col item-name text-left item-bold padding-one align-self-center" style="box-sizing: border-box;position: relative;width: 100%;padding-right: 15px;padding-left: 15px;-ms-flex-preferred-size: 0;flex-basis: 0;-ms-flex-positive: 1;flex-grow: 1;max-width: 100%;margin: auto;height: auto;color: black;font-weight: bold;font-size: 2vh;padding: 0 0 0 1vh;text-align: left!important;-ms-flex-item-align: center!important;align-self: center!important;">
    ${element.name}
    </div>
    <div class="col padding-zero text-left align-self-center" style="box-sizing: border-box;position: relative;width: 100%;padding-right: 15px;padding-left: 15px;-ms-flex-preferred-size: 0;flex-basis: 0;-ms-flex-positive: 1;flex-grow: 1;max-width: 100%;margin: auto;height: auto;padding: 0;text-align: left!important;-ms-flex-item-align: center!important;align-self: center!important;">
    엔터테인먼트
    </div>
    <div class="col-3 item-bold padding-zero text-right align-self-center" style="box-sizing: border-box;position: relative;width: 100%;padding-right: 15px;padding-left: 15px;-ms-flex: 0 0 25%;flex: 0 0 25%;max-width: 25%;color: black;font-weight: bold;font-size: 2vh;padding: 0;text-align: right!important;-ms-flex-item-align: center!important;align-self: center!important;">
    월 ${element.price}원
</div>
<div class="col-2 padding-zero text-right align-self-center" style="box-sizing: border-box;position: relative;width: 100%;padding-right: 15px;padding-left: 15px;-ms-flex: 0 0 16.666667%;flex: 0 0 16.666667%;max-width: 16.666667%;padding: 0;text-align: right!important;-ms-flex-item-align: center!important;align-self: center!important;">
    매달 ${moment(element.paymentDate, 'YYYY-MM-DD').date()}일
</div>
</div>
</div>
</div>
</div>
    `;
    }
  });

  return userSubscriptionslist;
};

export default {
  createHtml,
};

