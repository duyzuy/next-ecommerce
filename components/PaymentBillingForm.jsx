import { memo, useMemo } from 'react';
import Input from './Input';
import Select from './Select';
const PaymentBillingForm = ({
  formKey,
  onChange,
  isLoading,
  data,
  countries,
  cities
}) => {
  const countryEmptyOpt = { value: '', key: '', text: 'Chọn quốc gia' };
  const cityEmtyOpt = { value: '', key: '', text: 'Chọn thành phố' };
  const naData = { value: 'n/a', key: 'n/a', text: 'N/A' };

  const citiesOpts = useMemo(() => {
    let arrCities = [{ ...cityEmtyOpt }];
    cities.forEach((item, index) => {
      let districts = [];
      item.districts.forEach((subItem, subIndex) => {
        districts[subIndex] = {
          code: subItem.code,
          codeName: subItem.codename,
          provinceCode: subItem.province_code,
          divisionType: subItem.division_type,
          value: subItem.codename,
          text: subItem.name,
          wards: subItem.wards
        };
      });

      arrCities.push({
        code: item.code,
        codeName: item.codename,
        phoneCode: item.phone_code,
        divisionType: item.division_type,
        value: item.codename,
        text: item.name,
        districts: districts
      });
    });

    if (!data.country || data.country.key !== 'VN') {
      return [{ ...cityEmtyOpt }, { ...naData }];
    }
    return arrCities;
  }, [data.country]);

  const districtOpts = useMemo(() => {
    return data.city?.districts || [];
  }, [data?.city]);

  return (
    <div className="billing__form">
      <div className="form-row">
        <Input
          name="firstName"
          label="Họ"
          placeholder="Họ"
          value={data.firstName || ''}
          onChange={(e) => onChange(`${formKey}.firstName`, e.target.value)}
        />
        <Input
          name="lastName"
          label="Tên đệm và tên"
          placeholder="Tên đệm và tên"
          value={data.lastName || ''}
          onChange={(e) => onChange(`${formKey}.lastName`, e.target.value)}
        />
      </div>
      <div className="form-row">
        <Input
          name="email"
          label="Email"
          placeholder="Email"
          value={data.email || ''}
          onChange={(e) => onChange(`${formKey}.email`, e.target.value)}
        />
        <Input
          name="phone"
          label="Số điện thoại"
          placeholder="Số điện thoại"
          value={data.phone || ''}
          onChange={(e) => onChange(`${formKey}.phone`, e.target.value)}
        />
      </div>
      <div className="form-row">
        <Select
          label="Quốc gia"
          isShowSearch
          options={countries}
          defaultSelect={countryEmptyOpt}
          selected={data.country || {}}
          onSetSelected={(value) => onChange(`${formKey}.country`, value)}
        />
        <Select
          label="Tỉnh/thành phố"
          isShowSearch
          options={citiesOpts}
          defaultSelect={cityEmtyOpt}
          selected={data.city || ''}
          onSetSelected={(value) => onChange(`${formKey}.city`, value)}
        />
      </div>
      <div className="form-row">
        <Select
          label="Quận/huyện"
          isShowSearch
          options={districtOpts}
          selected={data.district || {}}
          onSetSelected={(value) => onChange(`${formKey}.district`, value)}
        />
        <Input
          name="postCode"
          label="Mã bưu điện"
          placeholder="Mã bưu điện"
          value={data.postCode || ''}
          onChange={(e) => onChange(`${formKey}.postCode`, e.target.value)}
        />
      </div>
      <Input
        name="address"
        label="Địa chỉ"
        placeholder="Địa chỉ"
        value={data.address || ''}
        onChange={(e) => onChange(`${formKey}.address`, e.target.value)}
      />
    </div>
  );
};
export default memo(PaymentBillingForm);
