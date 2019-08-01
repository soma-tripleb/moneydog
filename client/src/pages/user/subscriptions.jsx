import React, { Component } from 'react'

// import '../../static/style/page/subscriptions.css';

class Subscriptions extends Component {
  render() {
    return (
      <>
        <h1>Subscriptions</h1>
        <div style={
            {
              height: 500, 
              backgroundColor: 'rgba(255,0,0,0.1)',
              padding: 100,
            }
          }>
          <div class="mh-100 d-inline-block" style={
            {
              height: '100%',
              width: '45%', 
              backgroundColor: 'rgba(0,0,255,.1)',
              border: '1px black solid',
              borderRadius: '5px',
              overflowX: 'auto',
            }
          }>
            Height 25%
            <div class="w-25 p-3" style={{backgroundColor: '#eee'}}>Width 25%</div>
            <div class="w-50 p-3" style={{backgroundColor: '#eee'}}>Width 25%</div>
            <div class="w-75 p-3" style={{backgroundColor: '#eee'}}>Width 25%</div>
            <div class="w-100 p-3" style={{backgroundColor: '#eee'}}>Width 25%</div>
            <div class="w-25 p-3" style={{backgroundColor: '#eee'}}>Width 25%</div>
            <div class="w-50 p-3" style={{backgroundColor: '#eee'}}>Width 25%</div>
            <div class="w-75 p-3" style={{backgroundColor: '#eee'}}>Width 25%</div>
            <div class="w-100 p-3" style={{backgroundColor: '#eee'}}>Width 25%</div>
          </div>

          <div class="mh-100 d-inline-block" style={{width: '10%', backgroundColor: 'rgba(0,255,1,.1)' }} >
            Height 25%
          </div>

          <div class="mh-100 d-inline-block" style={
            {
              height: '100%',
              width: '45%', 
              backgroundColor: 'rgba(0,0,1,.255)',
              border: '1px black solid',
              borderRadius: '5px',
              overflowX: 'auto',
            }
          }>
            Height 25%
            <div class="w-25 p-3" style={{backgroundColor: '#eee'}}>Width 25%</div>
            <div class="w-50 p-3" style={{backgroundColor: '#eee'}}>Width 25%</div>
            <div class="w-75 p-3" style={{backgroundColor: '#eee'}}>Width 25%</div>
          </div>
        </div>
      </>
    );
  }
}

export default Subscriptions;