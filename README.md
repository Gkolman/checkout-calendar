# Checkout/pricing: micro-service

### Description:
    Enhanced throughput of service oriented component that contained 80 million+
    records by 295% from 342 rps to 1009 rps through horizontal scaling. Incorporated
    k6 load testing software in tandem with newRelic to identify “bottleneck” points
    in infrastructure. Configured stress testing simulations to generate quantifiable
    performance data to be measured and documented. Designed proxy server using nginx
    to delegate network requests across multiple servers to reduce server loads.
    Diagrammed component architecture using lucidchart.com and documented all findings/
    improvements

### Tools used:

#### Front-end:
    React-hooks

#### Back-end:
    Postgres, Sequelize, Nginx, Express

#### Testing:
    K6, Artillery, New Relic, Lighthouse

#### Dev-tools:
    Webpack, Ubuntu, Aws CLI, Javascript

  ![](/images/sdc.gif)

### How to start?:
####  simply clone the mini-apps project copy and pasting this into your terminal and hitting enter
    git clone https://github.com/Gkolman/checkout-calendar

#### the cd into the folder via
    cd gage-checkout-calendar-component

#### install application dependices
    npm install
#### then start the application by running
    npm start

#### look at other reviews for items
    change the id number in the url from  http://localhost:3000/1 to  http://localhost:3000/2 or 1-9999978
### Improvements I would make;
    * Implement more server side rendering
    * impliment lazy loading
    * convert to next.js project

