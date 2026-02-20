import React, { useEffect } from 'react';
import { View, FlatList, StyleSheet, SafeAreaView, Text } from 'react-native';
import { ProductCard } from '../components/common/ProductCard';
import { useProductStore } from '../store/products';
import { Colors } from '../constants/Colors';
import { useNavigation } from '@react-navigation/native';

export default function ProductsScreen() {
    const { products, fetchProducts, loading } = useProductStore();
    const navigation = useNavigation<any>();

    useEffect(() => {
        fetchProducts();
    }, []);

    return (
        <SafeAreaView style={styles.container}>
            <FlatList
                data={products}
                extraData={loading}
                keyExtractor={(item) => item.id.toString()}
                renderItem={({ item }) => (
                    <ProductCard
                        product={item}
                        onPress={() => navigation.navigate('ProductDetail', { product: item })}
                    />
                )}
                numColumns={2}
                contentContainerStyle={styles.list}
                columnWrapperStyle={styles.column}
            />
        </SafeAreaView>
    );
}

const styles = StyleSheet.create({
    container: { flex: 1, backgroundColor: 'white' },
    list: { padding: 16 },
    column: { justifyContent: 'space-between' },
});
