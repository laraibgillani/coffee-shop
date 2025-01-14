import React from 'react';
import {
  Image,
  Modal as RNModal,
  SafeAreaView,
  StyleProp,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
  ViewStyle,
} from 'react-native';

interface ModalProps {
  visible: boolean;
  onClose: () => void;
  children?: any;
  title?: string;
  selectedType: {
    bike?: string;
    coffee?: string;
    sugar?: string;
  };
  setSelectedType: React.Dispatch<React.SetStateAction<any>>;
  showTitle?: boolean;
  modalPosition?: StyleProp<ViewStyle>;
  modalWidth?: string | number;
}

const Modal: React.FC<ModalProps> = ({
  visible,
  onClose,
  children,
  title,
  selectedType,
  setSelectedType,
  showTitle = false,
  modalPosition,
  modalWidth = '80%',
}) => {
  const renderButton = (title: string, label: string) => (
    <TouchableOpacity
      style={[
        styles.buttonStyle,
        selectedType[title] === label && styles.selectedButton,
      ]}
      onPress={() =>
        setSelectedType(prev => ({
          ...prev,
          [title]: label,
        }))
      }>
      <Text
        style={[
          styles.btnText,
          selectedType[title] === label && styles.selectedText,
        ]}>
        {label}
      </Text>
    </TouchableOpacity>
  );

  const renderButtons = () => {
    switch (title) {
      case 'bike':
        return (
          <View style={styles.wrapper}>
            {renderButton('bike', 'Pick Up')}
            {renderButton('bike', 'Delivery')}
          </View>
        );
      case 'coffee':
        return (
          <View style={styles.wrapper}>
            {renderButton('coffee', 'Hot Coffee')}
            {renderButton('coffee', 'Cold Coffee')}
          </View>
        );
      case 'sugar':
        return (
          <View style={styles.wrapper}>
            {renderButton('sugar', 'With Sugar')}
            {renderButton('sugar', 'Without Sugar')}
          </View>
        );
      default:
        return null;
    }
  };

  return (
    <RNModal
      transparent={true}
      visible={visible}
      onRequestClose={onClose}
      animationType="slide">
      <SafeAreaView style={[styles.container, modalPosition]}>
        <View style={[styles.modal, {width: modalWidth}]}>
          <TouchableOpacity style={styles.closeIcon} onPress={onClose}>
            <Image
              source={require('../assets/icons/close.png')}
              style={styles.image}
            />
          </TouchableOpacity>
          {showTitle && <Text style={styles.header}>{title}</Text>}
          <View>{children}</View>
          {renderButtons()}
        </View>
      </SafeAreaView>
    </RNModal>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: 'rgba(0,0,0,0.5)',
  },
  modal: {
    backgroundColor: 'white',
    borderRadius: 20,
    padding: 20,
  },
  closeIcon: {
    backgroundColor: '#919191',
    borderRadius: 20,
    padding: 10,
    margin: 10,
    width: 40,
    height: 40,
    justifyContent: 'center',
    alignItems: 'center',
    position: 'absolute',
    right: 0,
    top: 0,
  },
  header: {
    fontSize: 24,
    fontWeight: 'bold',
    alignSelf: 'center',
    paddingTop: 10,
  },
  image: {
    width: 30,
    height: 30,
  },
  wrapper: {
    marginTop: 20,
    padding: 10,
    alignItems: 'center',
    gap: 10,
  },
  buttonStyle: {
    width: '70%',
    height: 50,
    backgroundColor: '#E3E3E3',
    borderRadius: 10,
    justifyContent: 'center',
    alignItems: 'center',
    marginBottom: 10,
  },
  btnText: {
    fontSize: 18,
    fontWeight: '700',
    color: 'black',
  },
  selectedButton: {
    backgroundColor: '#C67C4E',
  },
  selectedText: {
    color: 'white',
  },
});

export default Modal;