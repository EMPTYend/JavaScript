function fetchActivity() {
    let fetchData = fetch('https://www.boredapi.com/api/activity/')
        .then(response => response.json())
        .then(data => data.activity)
        .catch(()=>"К сожалению, произошла ошибка")
    return fetchData;
}

/**
 * Функция для получения случайной активности с внешнего ресурса.
 * @returns {Promise<string>} Случайная активность.
 */
export async function getRandomActivity() 
{
  const response = fetchActivity();
  return await response;
}

/**
 * Функция для обновления отображения активности на HTML странице.
 * @param {string} activity Текст активности.
 */
export function updateActivity(activity) {
    const activityElement = document.getElementById("activity");
    activityElement.textContent = activity;
}
