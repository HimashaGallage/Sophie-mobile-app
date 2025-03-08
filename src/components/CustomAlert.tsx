import React from 'react';
import { Alert } from 'react-native';

interface CustomAlertProps {
     title: string;
     message: string;
     onPressOk: () => void;
}

const CustomAlert: React.FC<CustomAlertProps> = ({ title, message, onPressOk }) => {
     React.useEffect(() => {
          Alert.alert(
               title,
               message,
               [{
                    text: 'OK',
                    onPress: onPressOk,
               },],
               { cancelable: false }
          );
     }, []);

     return null;
};

export default CustomAlert;