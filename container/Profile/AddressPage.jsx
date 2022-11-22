import { useState, useCallback, useMemo } from 'react';
import * as Icon from 'react-feather';
import Button from '../../components/Button';
import { Loader } from 'semantic-ui-react';
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
            <div className="section-content">
              <div className="row">
                <div className="label">Họ</div>
                <div className="value">
                  {userData.editting === EDITS.BILLING ? (
                    <div className="ui small input fluid">
                      <input
                        type="text"
                        value={userData.billing.first_name}
                        disabled={(isLoading && true) || false}
                        placeholder="Họ"
                        onChange={(e) =>
                          handleChange('first_name', e.target.value)
                        }
                      />
                    </div>
                  ) : (
                    <p>{billing.first_name || '--'}</p>
                  )}
                </div>
              </div>
              <div className="row">
                <div className="label">Tên đệm và tên</div>
                <div className="value">
                  {userData.editting === EDITS.BILLING ? (
                    <div className="ui small input fluid">
                      <input
                        type="text"
                        value={userData.billing.last_name}
                        disabled={(isLoading && true) || false}
                        placeholder="Tên đệm và tên"
                        onChange={(e) =>
                          handleChange('last_name', e.target.value)
                        }
                      />
                    </div>
                  ) : (
                    <p>{billing.last_name || '--'}</p>
                  )}
                </div>
              </div>
              <div className="row">
                <div className="label">Điện thoại</div>
                <div className="value">
                  {userData.editting === EDITS.BILLING ? (
                    <div className="ui small input fluid">
                      <input
                        type="text"
                        value={userData.billing.phone}
                        disabled={(isLoading && true) || false}
                        placeholder="Điện thoại"
                        onChange={(e) => handleChange('phone', e.target.value)}
                      />
                    </div>
                  ) : (
                    <p>{billing.phone || '--'}</p>
                  )}
                </div>
              </div>
              <div className="row">
                <div className="label">Email</div>
                <div className="value">
                  {userData.editting === EDITS.BILLING ? (
                    <div className="ui small input fluid">
                      <input
                        type="text"
                        value={userData.billing.email}
                        disabled={(isLoading && true) || false}
                        placeholder="Email"
                        onChange={(e) => handleChange('email', e.target.value)}
                      />
                    </div>
                  ) : (
                    <p>{billing.email || '--'}</p>
                  )}
                </div>
              </div>
              <div className="row">
                <div className="label">Quốc gia/Khu vực</div>
                <div className="value">
                  <p>{billing.country || '--'}</p>
                </div>
              </div>
              <div className="row">
                <div className="label">Thành phố</div>
                <div className="value">
                  <p>{billing.city || '--'}</p>
                </div>
              </div>
              <div className="row">
                <div className="label">Mã tỉnh thành</div>
                <div className="value">
                  {userData.editting === EDITS.BILLING ? (
                    <div className="ui small input fluid">
                      <input
                        type="text"
                        value={userData.billing.postcode}
                        disabled={(isLoading && true) || false}
                        placeholder="Mã tỉnh thành"
                        onChange={(e) =>
                          handleChange('postcode', e.target.value)
                        }
                      />
                    </div>
                  ) : (
                    <p>{billing.postcode || '--'}</p>
                  )}
                </div>
              </div>
              <div className="row">
                <div className="label">Địa chỉ 1</div>
                <div className="value">
                  {userData.editting === EDITS.BILLING ? (
                    <div className="ui small input fluid">
                      <input
                        type="text"
                        value={userData.billing.address_1}
                        disabled={(isLoading && true) || false}
                        placeholder="Địa chỉ 1"
                        onChange={(e) =>
                          handleChange('address_1', e.target.value)
                        }
                      />
                    </div>
                  ) : (
                    <p>{billing.address_1 || '--'}</p>
                  )}
                </div>
              </div>
              <div className="row">
                <div className="label">Địa chỉ 2</div>
                <div className="value">
                  {userData.editting === EDITS.BILLING ? (
                    <div className="ui small input fluid">
                      <input
                        type="text"
                        value={userData.billing.address_2}
                        disabled={(isLoading && true) || false}
                        placeholder="Địa chỉ 2"
                        onChange={(e) =>
                          handleChange('address_2', e.target.value)
                        }
                      />
                    </div>
                  ) : (
                    <p>{billing.address_2 || '--'}</p>
                  )}
                </div>
              </div>

              {(userData.editting === EDITS.BILLING && (
                <div className="page-actions">
                  <Button
                    disabled={canUpdated === EDITS.BILLING ? false : true}
                    color={'primary'}
                    size="small"
                    onClick={() => onUpdateUserData(EDITS.BILLING)}
                  >
                    {(isLoading && 'Loading...') || 'Cập nhật'}
                  </Button>
                </div>
              )) || <></>}
            </div>
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
            <div className="section-content">
              <div className="row">
                <div className="label">Họ</div>
                <div className="value">
                  {userData.editting === EDITS.SHIPPING ? (
                    <div className="ui small input fluid">
                      <input
                        type="text"
                        value={userData.shipping.first_name}
                        disabled={(isLoading && true) || false}
                        placeholder="Họ"
                        onChange={(e) =>
                          handleChange('first_name', e.target.value)
                        }
                      />
                    </div>
                  ) : (
                    <p>{shipping.first_name || '--'}</p>
                  )}
                </div>
              </div>
              <div className="row">
                <div className="label">Tên đệm và tên</div>
                <div className="value">
                  {userData.editting === EDITS.SHIPPING ? (
                    <div className="ui small input fluid">
                      <input
                        type="text"
                        value={userData.shipping.last_name}
                        disabled={(isLoading && true) || false}
                        placeholder="Họ"
                        onChange={(e) =>
                          handleChange('last_name', e.target.value)
                        }
                      />
                    </div>
                  ) : (
                    <p>{shipping.last_name || '--'}</p>
                  )}
                </div>
              </div>
              <div className="row">
                <div className="label">Điện thoại</div>
                <div className="value">
                  {userData.editting === EDITS.SHIPPING ? (
                    <div className="ui small input fluid">
                      <input
                        type="text"
                        value={userData.shipping.phone}
                        disabled={(isLoading && true) || false}
                        placeholder="Điện thoại"
                        onChange={(e) => handleChange('phone', e.target.value)}
                      />
                    </div>
                  ) : (
                    <p>{shipping.phone || '--'}</p>
                  )}
                </div>
              </div>
              <div className="row">
                <div className="label">Quốc gia/Khu vực</div>
                <div className="value">
                  <p>{shipping.country || '--'}</p>
                </div>
              </div>
              <div className="row">
                <div className="label">Thành phố</div>
                <div className="value">
                  {userData.editting === EDITS.SHIPPING ? (
                    <div className="ui small input fluid">
                      <input
                        type="text"
                        value={userData.shipping.city}
                        disabled={(isLoading && true) || false}
                        placeholder="Thành phố"
                        onChange={(e) => handleChange('city', e.target.value)}
                      />
                    </div>
                  ) : (
                    <p>{shipping.city || '--'}</p>
                  )}
                </div>
              </div>
              <div className="row">
                <div className="label">Mã tỉnh thành</div>
                <div className="value">
                  {userData.editting === EDITS.SHIPPING ? (
                    <div className="ui small input fluid">
                      <input
                        type="text"
                        value={userData.shipping.postcode}
                        disabled={(isLoading && true) || false}
                        placeholder="Mã tỉnh thành"
                        onChange={(e) =>
                          handleChange('postcode', e.target.value)
                        }
                      />
                    </div>
                  ) : (
                    <p>{shipping.postcode || '--'}</p>
                  )}
                </div>
              </div>
              <div className="row">
                <div className="label">Địa chỉ 1</div>
                <div className="value">
                  {userData.editting === EDITS.SHIPPING ? (
                    <div className="ui small input fluid">
                      <input
                        type="text"
                        disabled={(isLoading && true) || false}
                        value={userData.shipping.address_1}
                        placeholder="Địa chỉ 1"
                        onChange={(e) =>
                          handleChange('address_1', e.target.value)
                        }
                      />
                    </div>
                  ) : (
                    <p>{shipping.address_1 || '--'}</p>
                  )}
                </div>
              </div>
              <div className="row">
                <div className="label">Địa chỉ 2</div>
                <div className="value">
                  {userData.editting === EDITS.SHIPPING ? (
                    <div className="ui small input fluid">
                      <input
                        type="text"
                        disabled={(isLoading && true) || false}
                        value={userData.shipping.address_2}
                        placeholder="Địa chỉ 2"
                        onChange={(e) =>
                          handleChange('address_2', e.target.value)
                        }
                      />
                    </div>
                  ) : (
                    <p>{shipping.address_2 || '--'}</p>
                  )}
                </div>
              </div>

              {(userData.editting === EDITS.SHIPPING && (
                <div className="page-actions">
                  <Button
                    color={'primary'}
                    size="small"
                    onClick={() => onUpdateUserData(EDITS.SHIPPING)}
                  >
                    {(isLoading && 'Loading...') || 'Cập nhật'}
                  </Button>
                </div>
              )) || <></>}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
export default AddressPage;
