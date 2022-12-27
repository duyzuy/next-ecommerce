import { useState, useCallback, useMemo } from 'react';
import * as Icon from 'react-feather';
import Button from '../../components/Button';
import { Loader } from 'semantic-ui-react';
import BillingForm from '../../components/BillingForm';
import ShippingForm from '../../components/ShippingForm';
const EDITS = {
  BILLING: 'billing',
  SHIPPING: 'shipping'
};
const AddressPage = ({ title, data, onUpdateUserInfor, isLoading }) => {
  const [userData, setUserData] = useState({
    billing: {},
    shipping: {},
    editting: ''
  });
  const { billing, shipping } = data;

  const onEditting = useCallback(
    (action) => {
      let formData = {};

      if (
        (userData.editting === EDITS.BILLING && action === EDITS.BILLING) ||
        (userData.editting === EDITS.SHIPPING && action === EDITS.SHIPPING)
      ) {
        formData = {
          editting: ''
        };
      } else {
        formData = {
          editting: action,
          [action]: data[action]
        };
      }

      setUserData(() => ({
        ...formData
      }));
    },
    [userData, data]
  );

  const canUpdated = useMemo(() => {
    if (
      userData.billing &&
      JSON.stringify(userData.billing) !== JSON.stringify(billing)
    ) {
      return 'billing';
    } else if (
      userData.shipping &&
      JSON.stringify(userData.shipping) !== JSON.stringify(shipping)
    ) {
      return 'shipping';
    }
    return '';
  }, [userData]);

  const handleChange = (key, value) => {
    setUserData((prevState) => ({
      ...prevState,
      [userData.editting]: {
        ...prevState[userData.editting],
        [key]: value
      }
    }));
  };

  const onUpdateUserData = (action) => {
    onUpdateUserInfor(
      action,
      {
        ...userData[action]
      },
      () => {
        setUserData(() => ({
          billing: {},
          shipping: {},
          editting: ''
        }));
      }
    );
  };
  return (
    <div className="account-page">
      <div className="section-header">
        <h3>{title}</h3>
      </div>
      <div className="section-content">
        <div className="inner-section">
          <div className="billing-address">
            <div className="section-header">
              <h4 className="title">Thông tin thanh toán</h4>
              <div className="header-actions">
                <Button
                  onClick={() => onEditting(EDITS.BILLING)}
                  icon={() =>
                    userData.editting === EDITS.BILLING ? (
                      <Icon.X size={11} />
                    ) : (
                      <Icon.Edit3 size={11} />
                    )
                  }
                  size="small"
                >
                  {userData.editting === EDITS.BILLING ? 'Huỷ bỏ' : 'Chỉnh sửa'}
                </Button>
              </div>
            </div>
            <BillingForm
              isEditting={userData.editting === EDITS.BILLING ? true : false}
              isLoading={isLoading}
              data={billing}
              isDisabled={canUpdated === 'billing' ? false : true}
              onUpdateUserData={onUpdateUserData}
              onChange={handleChange}
              formData={userData.billing}
            />
          </div>

          <div className="shipping-address">
            <div className="section-header">
              <h4 className="title">Thông tin người nhận</h4>
              <div className="header-actions">
                <Button
                  onClick={() => onEditting(EDITS.SHIPPING)}
                  icon={() =>
                    userData.editting === EDITS.SHIPPING ? (
                      <Icon.X size={11} />
                    ) : (
                      <Icon.Edit3 size={11} />
                    )
                  }
                  size="small"
                >
                  {userData.editting === EDITS.SHIPPING
                    ? 'Huỷ bỏ'
                    : 'Chỉnh sửa'}
                </Button>
              </div>
            </div>
            <ShippingForm
              isEditting={userData.editting === EDITS.SHIPPING ? true : false}
              isLoading={isLoading}
              data={shipping}
              isDisabled={canUpdated === 'shipping' ? false : true}
              onUpdateUserData={onUpdateUserData}
              onChange={handleChange}
              formData={userData.shipping}
            />
          </div>
        </div>
      </div>
    </div>
  );
};
export default AddressPage;
