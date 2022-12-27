import { memo, useState } from 'react';
import Button from '../Button';
const BillingForm = ({
  isEditting,
  isLoading,
  data,
  isDisabled,
  onUpdateUserData,
  onChange,
  formData
}) => {
  return (
    <div className="section-content">
      <div className="row">
        <div className="label">Họ</div>
        <div className="value">
          {(isEditting && (
            <div className="ui small input fluid">
              <input
                type="text"
                value={formData.firstName}
                disabled={(isLoading && true) || false}
                placeholder="Họ"
                onChange={(e) => onChange('firstName', e.target.value)}
              />
            </div>
          )) || <p>{data.firstName || '--'}</p>}
        </div>
      </div>
      <div className="row">
        <div className="label">Tên đệm và tên</div>
        <div className="value">
          {(isEditting && (
            <div className="ui small input fluid">
              <input
                type="text"
                value={formData.lastName}
                disabled={(isLoading && true) || false}
                placeholder="Họ"
                onChange={(e) => onChange('lastName', e.target.value)}
              />
            </div>
          )) || <p>{data.lastName || '--'}</p>}
        </div>
      </div>
      <div className="row">
        <div className="label">Điện thoại</div>
        <div className="value">
          {(isEditting && (
            <div className="ui small input fluid">
              <input
                type="text"
                value={formData.phone}
                disabled={(isLoading && true) || false}
                placeholder="Điện thoại"
                onChange={(e) => onChange('phone', e.target.value)}
              />
            </div>
          )) || <p>{data.phone || '--'}</p>}
        </div>
      </div>
      <div className="row">
        <div className="label">Quốc gia/Khu vực</div>
        <div className="value">
          <p>{data.country || '--'}</p>
        </div>
      </div>
      <div className="row">
        <div className="label">Thành phố</div>
        <div className="value">
          {(isEditting && (
            <div className="ui small input fluid">
              <input
                type="text"
                value={formData.city}
                disabled={(isLoading && true) || false}
                placeholder="Thành phố"
                onChange={(e) => onChange('city', e.target.value)}
              />
            </div>
          )) || <p>{data.city || '--'}</p>}
        </div>
      </div>
      <div className="row">
        <div className="label">Mã tỉnh thành</div>
        <div className="value">
          {(isEditting && (
            <div className="ui small input fluid">
              <input
                type="text"
                value={formData.postcode}
                disabled={(isLoading && true) || false}
                placeholder="Mã tỉnh thành"
                onChange={(e) => onChange('postcode', e.target.value)}
              />
            </div>
          )) || <p>{data.postcode || '--'}</p>}
        </div>
      </div>
      <div className="row">
        <div className="label">Địa chỉ 1</div>
        <div className="value">
          {(isEditting && (
            <div className="ui small input fluid">
              <input
                type="text"
                disabled={(isLoading && true) || false}
                value={formData.address1}
                placeholder="Địa chỉ 1"
                onChange={(e) => onChange('address1', e.target.value)}
              />
            </div>
          )) || <p>{data.address1 || '--'}</p>}
        </div>
      </div>
      <div className="row">
        <div className="label">Địa chỉ 2</div>
        <div className="value">
          {(isEditting && (
            <div className="ui small input fluid">
              <input
                type="text"
                disabled={(isLoading && true) || false}
                value={formData.address2}
                placeholder="Địa chỉ 2"
                onChange={(e) => onChange('address2', e.target.value)}
              />
            </div>
          )) || <p>{data.address2 || '--'}</p>}
        </div>
      </div>

      {(isEditting && (
        <div className="page-actions">
          <Button
            disabled={isDisabled}
            color={'primary'}
            size="small"
            onClick={() => onUpdateUserData('shipping')}
          >
            {(isLoading && 'Loading...') || 'Cập nhật'}
          </Button>
        </div>
      )) || <></>}
    </div>
  );
};
export default memo(BillingForm);
