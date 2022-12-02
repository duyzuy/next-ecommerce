import { wcApi } from '../../../api/woo';
import checkAuthenticated from '../../../lib/checkAuthenticated';

const orderDetailHandler = async (req, res) => {
  const { query } = req;

  const isAuthenticated = await checkAuthenticated(req, res);

  if (isAuthenticated) {
    await wcApi
      .get(`orders/${query.id}`)
      .then((response) => {
        res.status(200).json({
          status: 'oke',
          stattusCode: 200,
          data: {
            orderId: response.data.id,
            items: response.data.line_items,
            billing: response.data.billing,
            shipping: response.data.shipping,
            taxLines: response.data.tax_lines,
            status: response.data.status,
            total: response.data.total,
            totalTax: response.data.total_tax,
            currency: response.data.currency,
            paymentMethodCode: response.data.payment_method,
            paymentMethodTitle: response.data.payment_method_title,
            shippingTax: response.data.shipping_tax,
            shippingTotal: response.data.shipping_total
          }
        });
      })
      .catch((error) => {
        console.log('Response Status:', error.status);
        console.log('Response Headers:', error.headers);
        console.log('Response Data:', error.data);
      });
  } else {
    res.status(401).json({
      message: 'you are not allowed'
    });
  }
};

export default orderDetailHandler;
