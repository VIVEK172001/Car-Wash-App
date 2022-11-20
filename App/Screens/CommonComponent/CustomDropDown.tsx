import React, { useContext} from 'react';
import {
  StyleSheet,
} from 'react-native';
import { AppContext } from '@AppContext/index';
import { Dropdown } from 'react-native-element-dropdown';
interface CustomDropDown{
    data : any[],
    placeholder : string | undefined,
    searchPlaceholder : string | undefined,
    value : any,
    onFocus : (() => void) | undefined,
    onBlur : (() => void) | undefined
    onChange : (item: any) => void
}

const styles = StyleSheet.create({
  dropdown: {
    height: 50,
    borderWidth: 1,
    borderRadius: 5,
    marginTop:15,
  },
  placeholderStyle: {
    fontSize: 14,
    marginLeft: 10,
    opacity: 0.2
  },
  selectedTextStyle: {
    fontSize: 14,
    marginLeft: 10,
  },
  iconStyle: {
    width: 20,
    height: 20,
  },
  inputSearchStyle: {
    height: 40,
    fontSize: 16,
  },

});

const CustomDropDown = React.forwardRef(
  (
    {
        data,
        placeholder,
        searchPlaceholder,
        value,
        onFocus,
        onBlur,
        onChange,
      ...props
    }: CustomDropDown,
    ref: any,
  ) => {
  const { appTheme } = useContext(AppContext);

  const { dropdown, placeholderStyle, selectedTextStyle, inputSearchStyle, iconStyle} = styles;


  return (
    <>
        <Dropdown
            style={[dropdown,{borderColor:appTheme.textContainer,backgroundColor:appTheme.background}]}
            placeholderStyle={[placeholderStyle,,{color:appTheme.textContainer}]}
            selectedTextStyle={[selectedTextStyle,{color:appTheme.textContainer}]}
            inputSearchStyle={[inputSearchStyle,{color:appTheme.textContainer,backgroundColor:appTheme.background}]}
            containerStyle={{backgroundColor:appTheme.background}}
            activeColor={appTheme.background}
            iconStyle={iconStyle}
            data={data}
            search
            maxHeight={300}
            labelField="label"
            valueField="value"
            placeholder={placeholder}
            searchPlaceholder="Search..."
            value={value}
            onFocus={onFocus}
            onBlur={onBlur}
            onChange={onChange}
        />
    </>
 );
}
)

export { CustomDropDown };
