import React, { useEffect } from 'react';
import { View, Text, StyleSheet, Animated } from 'react-native';
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';

interface ToastProps {
  visible: boolean;
  message: string;
  type?: 'success' | 'error' | 'warning' | 'info';
  duration?: number;
  onDismiss: () => void;
}

const Toast: React.FC<ToastProps> = ({
  visible,
  message,
  type = 'success',
  duration = 3000,
  onDismiss,
}) => {
  const opacity = new Animated.Value(0);
  const translateY = new Animated.Value(50);

  const getIconName = () => {
    switch (type) {
      case 'success':
        return 'check-circle';
      case 'error':
        return 'alert-circle';
      case 'warning':
        return 'alert';
      case 'info':
        return 'information';
      default:
        return 'check-circle';
    }
  };

  const getIconColor = () => {
    switch (type) {
      case 'success':
        return '#4CAF50';
      case 'error':
        return '#E06C75';
      case 'warning':
        return '#FFA000';
      case 'info':
        return '#2196F3';
      default:
        return '#4CAF50';
    }
  };

  useEffect(() => {
    if (visible) {
      // Reset values
      opacity.setValue(0);
      translateY.setValue(50);
      
      // Animation d'entrée
      Animated.parallel([
        Animated.timing(opacity, {
          toValue: 1,
          duration: 300,
          useNativeDriver: true,
        }),
        Animated.timing(translateY, {
          toValue: 0,
          duration: 300,
          useNativeDriver: true,
        }),
      ]).start();

      // Programmer la fermeture automatique
      const timer = setTimeout(() => {
        // Animation de sortie
        Animated.parallel([
          Animated.timing(opacity, {
            toValue: 0,
            duration: 300,
            useNativeDriver: true,
          }),
          Animated.timing(translateY, {
            toValue: 50,
            duration: 300,
            useNativeDriver: true,
          }),
        ]).start(() => {
          onDismiss();
        });
      }, duration);

      return () => clearTimeout(timer);
    }
  }, [visible, duration, opacity, translateY, onDismiss]);

  if (!visible) return null;

  return (
    <Animated.View 
      style={[
        styles.container, 
        { 
          opacity,
          transform: [{ translateY }]
        }
      ]}
    >
      <View 
        style={[
          styles.content, 
          { borderLeftColor: getIconColor() }
        ]}
      >
        <Icon name={getIconName()} size={20} color={getIconColor()} />
        <Text style={styles.message}>{message}</Text>
      </View>
    </Animated.View>
  );
};

const styles = StyleSheet.create({
  container: {
    position: 'absolute',
    bottom: 20,
    left: 0,
    right: 0,
    alignItems: 'center',
    zIndex: 1000,
  },
  content: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#1E1E2E',
    paddingVertical: 12,
    paddingHorizontal: 16,
    borderRadius: 12,
    borderLeftWidth: 4,
    shadowColor: "#000",
    shadowOffset: {
      width: 0,
      height: 6,
    },
    shadowOpacity: 0.25,
    shadowRadius: 8,
    elevation: 10,
    minWidth: 200,
    maxWidth: '80%',
  },
  message: {
    marginLeft: 10,
    color: '#E4E4E6',
    fontSize: 14,
    fontWeight: '500',
  },
});

export default Toast;