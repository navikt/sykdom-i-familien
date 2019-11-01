const path = require('path');

module.exports = [
  {
    path: '/isActive',
    component: path.resolve(`src/components/actuators/IsActive.tsx`)
  },
  {
    path: '/isAlive',
    component: path.resolve(`src/components/actuators/IsAlive.tsx`)
  }
];