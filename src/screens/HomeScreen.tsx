import React, { useEffect } from 'react';
import { View, Text, FlatList, StyleSheet, TextInput, ScrollView, TouchableOpacity, SafeAreaView, Platform, StatusBar } from 'react-native';
import { useProductStore } from '../store/products';
import { ProductCard } from '../components/common/ProductCard';
import { Colors } from '../constants/Colors';
import { Search, ShoppingBag } from 'lucide-react-native';
import { useNavigation } from '@react-navigation/native';
import { useCartStore } from '../store/cart';

export default function HomeScreen() {
    const { products, categories, fetchProducts, fetchCategories, loading } = useProductStore();
    const navigation = useNavigation<any>();
    const cartItems = useCartStore(state => state.items);

    useEffect(() => {
        fetchProducts();
        fetchCategories();
    }, []);

    const renderHeader = () => (
        <View style={styles.headerContainer}>
            {/* Top Bar */}
            <View style={styles.topBar}>
                <View>
                    <Text style={styles.greeting}>Deliver to My Home</Text>
                    <Text style={styles.address}>Select Address ▼</Text>
                </View>
                <TouchableOpacity style={styles.cartIcon} onPress={() => navigation.navigate('Cart')}>
                    <ShoppingBag color={Colors.text.primary} size={24} />
                    {cartItems.length > 0 && (
                        <View style={styles.badge}>
                            <Text style={styles.badgeText}>{cartItems.length}</Text>
                        </View>
                    )}
                </TouchableOpacity>
            </View>

            {/* Search */}
            <View style={styles.searchContainer}>
                <Search size={20} color={Colors.text.muted} style={styles.searchIcon} />
                <TextInput
                    style={styles.input}
                    placeholder="Search for products or categories"
                    placeholderTextColor={Colors.text.muted}
                />
            </View>

            {/* Categories */}
            <View style={styles.section}>
                <Text style={styles.sectionTitle}>Categories</Text>
                <FlatList
                    horizontal
                    data={categories}
                    keyExtractor={(item) => item.id.toString()}
                    showsHorizontalScrollIndicator={false}
                    contentContainerStyle={{ paddingHorizontal: 16 }}
                    renderItem={({ item }) => (
                        <TouchableOpacity style={styles.categoryItem}>
                            <View style={styles.categoryIcon}>
                                <Text>🍽️</Text>
                            </View>
                            <Text style={styles.categoryName} numberOfLines={1}>{item.name}</Text>
                        </TouchableOpacity>
                    )}
                />
            </View>

            <Text style={[styles.sectionTitle, { paddingHorizontal: 16, marginTop: 20, marginBottom: 10 }]}>Featured Products</Text>
        </View>
    );

    return (
        <SafeAreaView style={styles.safeArea}>
            <StatusBar barStyle="dark-content" backgroundColor="white" />
            <FlatList
                data={products}
                keyExtractor={(item) => item.id.toString()}
                renderItem={({ item }) => (
                    <ProductCard
                        product={item}
                        onPress={() => navigation.navigate('ProductDetail', { product: item })}
                    />
                )}
                numColumns={2}
                columnWrapperStyle={styles.columnWrapper}
                contentContainerStyle={styles.list}
                ListHeaderComponent={renderHeader}
                showsVerticalScrollIndicator={false}
            />
        </SafeAreaView>
    );
}

const styles = StyleSheet.create({
    safeArea: { flex: 1, backgroundColor: 'white', paddingTop: Platform.OS === 'android' ? StatusBar.currentHeight : 0 },
    headerContainer: { backgroundColor: 'white', paddingBottom: 10 },
    topBar: { flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center', paddingHorizontal: 16, paddingVertical: 12 },
    greeting: { fontSize: 13, color: Colors.text.secondary, fontWeight: '600' },
    address: { fontSize: 15, color: Colors.primary, fontWeight: 'bold' },
    cartIcon: { position: 'relative', padding: 4 },
    badge: { position: 'absolute', top: 0, right: 0, backgroundColor: Colors.primary, width: 16, height: 16, borderRadius: 8, justifyContent: 'center', alignItems: 'center', borderWidth: 1.5, borderColor: 'white' },
    badgeText: { color: 'white', fontSize: 9, fontWeight: 'bold' },

    searchContainer: { flexDirection: 'row', alignItems: 'center', backgroundColor: '#F3F4F6', marginHorizontal: 16, borderRadius: 12, paddingHorizontal: 12, height: 48, marginBottom: 20 },
    searchIcon: { marginRight: 8 },
    input: { flex: 1, height: '100%', fontSize: 14, color: Colors.text.primary },

    section: { marginTop: 10 },
    sectionTitle: { fontSize: 18, fontWeight: 'bold', marginBottom: 12, paddingHorizontal: 16, color: Colors.text.primary },

    categoryItem: { alignItems: 'center', marginRight: 16, width: 64 },
    categoryIcon: { width: 56, height: 56, borderRadius: 28, backgroundColor: '#FFF0F1', justifyContent: 'center', alignItems: 'center', marginBottom: 6 },
    categoryName: { fontSize: 11, fontWeight: '600', color: Colors.text.secondary, textAlign: 'center' },

    list: { paddingBottom: 20 },
    columnWrapper: { justifyContent: 'space-between', paddingHorizontal: 16 },
});
