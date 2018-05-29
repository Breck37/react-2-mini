import bottle from './assets/DM_Bottle.jpg';
import hat from './assets/DM_Hat.jpeg';
import ladiesTee from './assets/DM_Ladies_Tee.jpg';
import lanyard from './assets/DM_Lanyard.jpg';
import socks from './assets/DM_Socks.jpeg';
import tee from './assets/DM_Tee.jpg';

export default [{
    name: 'WebDev Tri T-Shirt',
    price: 25,
    picture: tee
  }, {
    name: 'WebDev Ladies Tri T-shirt',
    price: 25,
    picture: ladiesTee
  }, {
    name: '#DevLife Modern Dad Cap',
    price: 19,
    picture: hat
  }, {
    name: 'DevMountain Shiny Bottle',
    price: 20,
    picture: bottle
  }, {
    name: 'DevMountain Lanyard',
    price: 6, picture: lanyard
  }, {
    name: 'DevMountain Moonwalk Socks',
    price: 15,
    picture: socks
  }];