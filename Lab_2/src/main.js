import { getRandomActivity, updateActivity } from './activity.js';

let activityPromise = new Promise((resolve)=>{
    resolve(getRandomActivity());
});
activityPromise.then((activity)=>updateActivity(activity));

(async()=>{
    setInterval(async ()=>{
        let activity = await getRandomActivity();
        updateActivity(activity);
      }, 1000);
})();
