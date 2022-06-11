import OrderPerDayAnalytics from './orderPerDayAnalytics.model';

export const record = async (
  shop: string,
  difference: number,
): Promise<void> => {
  const date = new Date(new Date().setHours(0, 0, 0, 0));
  const analytics = await OrderPerDayAnalytics.findOne({
    shop,
    date,
  });

  if (!analytics) {
    await OrderPerDayAnalytics.create({
      shop,
      date,
      amount: difference,
    });
    return;
  }

  await OrderPerDayAnalytics.updateOne(
    { shop, date },
    { $inc: { amount: difference } },
  );
};
