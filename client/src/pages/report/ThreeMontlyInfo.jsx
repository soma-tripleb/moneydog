import React, { Component } from 'react';
import {Col, Row} from 'react-bootstrap';
import moment from 'moment';

class ThreeMontlyInfo extends Component {

  state = {
    currentMonth: moment().month(),
  }

  componentDidMount() {
    this.drawChart1();
    this.drawChart2();
    this.drawChart3();
  };

  drawChart1 =()=>{
    const ctx = document.getElementById('myChart1').getContext('2d');
    const myChart = new Chart(ctx, {
      type: 'bar',
      data: {
        labels: ['어플 수', '평균가격', '총액'],
        datasets: [{
          label: '# of Votes',
          data: [2, 0.9, 2.5],
          backgroundColor: [
            'rgba(255, 99, 132, 0.2)',
            'rgba(54, 162, 235, 0.2)',
            'rgba(75, 192, 192, 0.2)',
          ],
          borderColor: [
            'rgba(255,99,132,1)',
            'rgba(54, 162, 235, 1)',
            'rgba(75, 192, 192, 1)',
          ],
          borderWidth: 1
        }]
      },
      options: {
        legend: {
          display: false,
        },
        tooltips: {
          callbacks: {
            label: tooltipItem => `${tooltipItem.yLabel}: ${tooltipItem.xLabel}`,
            title: () => null,
          }
        },
        maintainAspectRatio: false, // default value. false일 경우 포함된 div의 크기에 맞춰서 그려짐.
        scales: {
          yAxes: [{
            ticks: {
              beginAtZero: true
            }
          }]
        }
      }
    });
  };

  drawChart2 =()=>{
    const ctx = document.getElementById('myChart2').getContext('2d');
    const myChart = new Chart(ctx, {
      type: 'bar',
      data: {
        labels: ['어플 수', '평균가격', '총액'],
        datasets: [{
          label: '# of Votes',
          data: [1, 0.9, 1.1],
          backgroundColor: [
            'rgba(255, 99, 132, 0.2)',
            'rgba(54, 162, 235, 0.2)',
            'rgba(75, 192, 192, 0.2)',
          ],
          borderColor: [
            'rgba(255,99,132,1)',
            'rgba(54, 162, 235, 1)',
            'rgba(75, 192, 192, 1)',
          ],
          borderWidth: 1
        }]
      },
      options: {
        legend: {
          display: false,
        },
        tooltips: {
          callbacks: {
            label: tooltipItem => `${tooltipItem.yLabel}: ${tooltipItem.xLabel}`,
            title: () => null,
          }
        },
        maintainAspectRatio: false, // default value. false일 경우 포함된 div의 크기에 맞춰서 그려짐.
        scales: {
          yAxes: [{
            ticks: {
              beginAtZero: true
            }
          }]
        }
      }
    });
  };

  drawChart3 =()=>{
    const ctx = document.getElementById('myChart3').getContext('2d');
    const myChart = new Chart(ctx, {
      type: 'bar',
      data: {
        labels: ['어플 수', '평균가격', '총액'],
        datasets: [{
          label: '# of Votes',
          data: [3, 0.9, 2.9],
          backgroundColor: [
            'rgba(255, 99, 132, 0.2)',
            'rgba(54, 162, 235, 0.2)',
            'rgba(75, 192, 192, 0.2)',
          ],
          borderColor: [
            'rgba(255,99,132,1)',
            'rgba(54, 162, 235, 1)',
            'rgba(75, 192, 192, 1)',
          ],
          borderWidth: 1
        }]
      },
      options: {
        legend: {
          display: false,
        },
        tooltips: {
          callbacks: {
            label: tooltipItem => `${tooltipItem.yLabel}: ${tooltipItem.xLabel}`,
            title: () => null,
          }
        },
        maintainAspectRatio: false, // default value. false일 경우 포함된 div의 크기에 맞춰서 그려짐.
        scales: {
          yAxes: [{
            ticks: {
              beginAtZero: true
            }
          }]
        }
      }
    });
  };

  render() {
    return (
      <>
        <Row>
          <Col>
            <div className="report-subtitle">
              3달간 사용량 비교
            </div>
            <div className="row">
              <div className="col-4">
                <div>
                  {this.state.currentMonth-1}월
                </div>
                <div>
                  <canvas id="myChart1"></canvas>
                </div>
              </div>
              <div className="col-4">
                <div>
                  {this.state.currentMonth}월
                </div>
                <div>
                  <canvas id="myChart2"></canvas>
                </div>
              </div>
              <div className="col-4">
                <div>
                  {this.state.currentMonth+1}월
                </div>
                <div>
                  <canvas id="myChart3"></canvas>
                </div>
              </div>
            </div>
          </Col>
        </Row>
      </>
    );
  }
}
export default ThreeMontlyInfo;
