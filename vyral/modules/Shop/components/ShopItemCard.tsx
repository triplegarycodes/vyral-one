import React from 'react';
import { StyleSheet, Text, View } from 'react-native';
import { palette } from '@/theme/tokens';

type ShopItemCardProps = {
  name: string;
  cost: number;
};

export const ShopItemCard: React.FC<ShopItemCardProps> = ({ name, cost }) => (
  <View style={styles.container}>
    <Text style={styles.name}>{name}</Text>
    <Text style={styles.cost}>{cost} credits</Text>
  </View>
);

const styles = StyleSheet.create({
  container: {
    backgroundColor: palette.surface,
    padding: 20,
    borderRadius: 16,
    gap: 8
  },
  name: {
    color: palette.textPrimary,
    fontSize: 18,
    fontWeight: '600'
  },
  cost: {
    color: palette.textSecondary,
    fontSize: 14
  }
});
