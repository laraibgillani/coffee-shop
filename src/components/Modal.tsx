import React, {useState} from 'react';
import {
  View,
  Modal,
  StyleSheet,
  TouchableOpacity,
  Image,
  StyleProp,
  ViewStyle,
} from 'react-native';

interface CommonModalProps {
  isVisible?: boolean;
  onClose?: () => void;
  children?: any;
  position?: StyleProp<ViewStyle>;
}
const CommonModal: React.FC<CommonModalProps> = ({isVisible, onClose, children, position}) => {
  return (
    <Modal
      visible={isVisible}
      transparent={true}
      animationType="slide"
      onRequestClose={onClose}
      style={{ height: 'auto'}}>
      <View style={[styles.modalOverlay, position]}>
        <View style={styles.modalContent}>
          <View style={{ paddingLeft:'88%'}}>
            <TouchableOpacity onPress={onClose} style={{backgroundColor: '#979595' , borderRadius:15}}>
              <Image
                source={require('../assets/icons/close.png')}
                style={styles.closeButton}
              />
            </TouchableOpacity>
          </View>
          {children}
        </View>
      </View>
    </Modal>
  );
};

export default CommonModal;

const styles = StyleSheet.create({
  modalOverlay: {
    flex: 1,
    backgroundColor: 'rgba(0, 0, 0, 0.5)',
    justifyContent: 'center',
    alignItems: 'center',
  },
  modalContent: {
    backgroundColor: 'white',
    padding: 10,
    borderRadius: 10,
    alignItems: 'center',
    width:'98%'
  },
  closeButton: {
    height: 30,
    width: 30,
  },
});
