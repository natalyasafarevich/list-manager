export const remove = (arr: any, item: number): Notification[] => {
  const newArr = arr.filter((notification: any) => notification?.id !== item);
  return newArr;
};

// let newIndex = 0;
// export const add = (arr: Notification[]): Notification[] => {
//   const newId = arr.length;
//   const randomText = generateRandomText();
//   const newNotification: Notification = {id: newId, text: randomText};
//   return [...arr, newNotification];
// };
