import React from 'react'

import { ActivityIndicator, View, ViewStyle } from 'react-native';
import { useTheme } from 'styled-components/native';

interface LoadIndicatorProps {
  style?: ViewStyle
  loading: boolean
}

export function LoadIndicator({ loading, style }: LoadIndicatorProps) {
  const { colors } = useTheme();

  if (loading !== undefined && !loading) return null;
  else
    return (
      <View
        style={{
          alignSelf: "center",
          justifyContent: 'center',
          alignItems: 'center',
          marginVertical: 20,
          ...style
        }}
      >
        <ActivityIndicator style={{
          minHeight: '10%',
          minWidth: '10%'
        }} size="large" color={colors.primary} />
      </View>
    );
}
