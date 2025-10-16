import React from 'react';
import { ScrollView, StyleSheet, Text } from 'react-native';
import { useAuth } from '@/context/AuthContext';
import { palette } from '@/theme/tokens';
import { useShopLogic } from './hooks/useShopLogic';
import { ShopItemCard } from './components/ShopItemCard';

const ShopScreen: React.FC = () => {
  const { user } = useAuth();
  const { items } = useShopLogic(user?.id);

  return (
    <ScrollView contentContainerStyle={styles.container}>
      <Text style={styles.heading}>Shop</Text>
      <Text style={styles.subheading}>Spend rewards on boosters and artifacts.</Text>
      {(items.length ? items : [{ id: 'starter-pack', item_key: 'Starter Pack', quantity: 1 }]).map((item) => (
        <ShopItemCard key={item.id} name={item.item_key} cost={item.quantity * 100} />
      ))}
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  container: {
    flexGrow: 1,
    padding: 24,
    gap: 16,
    backgroundColor: '#020617'
  },
  heading: {
    color: palette.textPrimary,
    fontSize: 32,
    fontWeight: '700'
  },
  subheading: {
    color: palette.textSecondary,
    fontSize: 16
  }
});

export default ShopScreen;
