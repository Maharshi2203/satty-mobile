import React, { useEffect } from 'react';
import { View, Text, FlatList, StyleSheet, TextInput, ScrollView, TouchableOpacity, SafeAreaView, Platform, StatusBar, Image, Dimensions } from 'react-native';
import { useProductStore } from '../store/products';
import { ProductCard } from '../components/common/ProductCard';
import { Colors } from '../constants/Colors';
import { Search, ShoppingBag, MapPin, Bell } from 'lucide-react-native';
import { useNavigation } from '@react-navigation/native';
import { useCartStore } from '../store/cart';
import { LinearGradient } from 'expo-linear-gradient';

const { width } = Dimensions.get('window');

const FEATURED_BANNERS = [
    { id: '1', title: 'Fresh & Healthy', subtitle: 'Authentic Maharashtrian Spices', image: 'https://images.unsplash.com/photo-1546069901-ba9599a7e63c?w=800' },
    { id: '2', title: 'New Arrival', subtitle: 'Pure & Organic Ingredients', image: 'https://images.unsplash.com/photo-1596797038583-18a68a6393ca?w=800' },
];

export default function HomeScreen() {
    const { products, categories, fetchProducts, fetchCategories, loading } = useProductStore();
    const navigation = useNavigation<any>();
    const cartItems = useCartStore(state => state.items);

    useEffect(() => {
        fetchProducts();
        fetchCategories();
    }, []);

    const renderHeader = () => (
        <View style={styles.headerOuter}>
            {/* Top Bar */}
            <View style={styles.topBar}>
                <View style={styles.locationContainer}>
                    <MapPin size={18} color={Colors.primary} />
                    <View style={{ marginLeft: 8 }}>
                        <Text style={styles.greeting}>Deliver to</Text>
                        <Text style={styles.address}>Home, Mumbai ▼</Text>
                    </View>
                </View>
                <View style={styles.topIcons}>
                    <TouchableOpacity style={styles.iconBtn}>
                        <Bell size={20} color={Colors.text.primary} />
                    </TouchableOpacity>
                    <TouchableOpacity style={styles.iconBtn} onPress={() => navigation.navigate('Cart')}>
                        <ShoppingBag size={20} color={Colors.text.primary} />
                        {cartItems.length > 0 && <View style={styles.badge}><Text style={styles.badgeText}>{cartItems.length}</Text></View>}
                    </TouchableOpacity>
                </View>
            </View>

            <Text style={styles.welcomeText}>Hi, User!</Text>

            {/* Search */}
            <View style={styles.searchContainer}>
                <Search size={20} color={Colors.text.secondary} style={styles.searchIcon} />
                <TextInput
                    style={styles.input}
                    placeholder="Search for spices, dishes, ingredients..."
                    placeholderTextColor={Colors.text.secondary}
                />
            </View>

            {/* Featured Carousel */}
            <ScrollView horizontal showsHorizontalScrollIndicator={false} pagingEnabled style={styles.carousel}>
                {FEATURED_BANNERS.map(banner => (
                    <View key={banner.id} style={styles.banner}>
                        <Image source={{ uri: banner.image }} style={styles.bannerImage} />
                        <LinearGradient
                            colors={['transparent', 'rgba(229, 9, 58, 0.7)']}
                            style={styles.bannerOverlay}
                        >
                            <Text style={styles.bannerTitle}>{banner.title}</Text>
                            <Text style={styles.bannerSubtitle}>{banner.subtitle}</Text>
                            <TouchableOpacity style={styles.bannerBtn}>
                                <LinearGradient
                                    colors={Colors.primaryGradient}
                                    style={styles.bannerBtnGradient}
                                >
                                    <Text style={styles.bannerBtnText}>Order Now</Text>
                                </LinearGradient>
                            </TouchableOpacity>
                        </LinearGradient>
                    </View>
                ))}
            </ScrollView>

            {/* Categories */}
            <View style={styles.section}>
                <View style={styles.sectionHeader}>
                    <Text style={styles.sectionTitle}>Categories</Text>
                    <TouchableOpacity><Text style={styles.seeAll}>See All</Text></TouchableOpacity>
                </View>
                <FlatList
                    horizontal
                    data={categories}
                    keyExtractor={(item) => item.id.toString()}
                    showsHorizontalScrollIndicator={false}
                    contentContainerStyle={{ paddingHorizontal: 20 }}
                    renderItem={({ item, index }) => (
                        <TouchableOpacity style={styles.categoryTile}>
                            <View style={[styles.categoryIcon, index === 0 && styles.selectedCategory]}>
                                <Text style={{ fontSize: 24 }}>🥘</Text>
                            </View>
                            <Text style={[styles.categoryName, index === 0 && styles.selectedCategoryText]} numberOfLines={1}>{item.name}</Text>
                        </TouchableOpacity>
                    )}
                />
            </View>

            <View style={styles.sectionHeader}>
                <Text style={styles.sectionTitle}>Popular Today</Text>
            </View>
        </View>
    );

    return (
        <SafeAreaView style={styles.safeArea}>
            <StatusBar barStyle="dark-content" backgroundColor={Colors.background} />
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
    safeArea: { flex: 1, backgroundColor: Colors.background, paddingTop: Platform.OS === 'android' ? StatusBar.currentHeight : 0 },
    headerOuter: { backgroundColor: Colors.background, paddingBottom: 10 },
    topBar: { flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center', paddingHorizontal: 20, paddingVertical: 12 },
    locationContainer: { flexDirection: 'row', alignItems: 'center' },
    topIcons: { flexDirection: 'row', gap: 12 },
    iconBtn: { position: 'relative', width: 40, height: 40, borderRadius: 20, backgroundColor: Colors.surface, justifyContent: 'center', alignItems: 'center' },
    greeting: { fontSize: 11, color: Colors.text.secondary, fontWeight: '600' },
    address: { fontSize: 14, color: Colors.text.primary, fontWeight: 'bold' },
    welcomeText: { fontSize: 28, fontWeight: 'bold', color: Colors.text.primary, paddingHorizontal: 20, marginTop: 10, marginBottom: 15 },
    badge: { position: 'absolute', top: 5, right: 5, backgroundColor: Colors.primary, width: 14, height: 14, borderRadius: 7, justifyContent: 'center', alignItems: 'center', borderWidth: 1, borderColor: Colors.surface },
    badgeText: { color: 'white', fontSize: 8, fontWeight: 'bold' },

    searchContainer: { flexDirection: 'row', alignItems: 'center', backgroundColor: Colors.surface, marginHorizontal: 20, borderRadius: 16, paddingHorizontal: 12, height: 54, marginBottom: 20, shadowColor: '#000', shadowOffset: { width: 0, height: 2 }, shadowOpacity: 0.05, shadowRadius: 5 },
    searchIcon: { marginRight: 8 },
    input: { flex: 1, height: '100%', fontSize: 15, color: Colors.text.primary },

    carousel: { height: 200, marginBottom: 20 },
    banner: { width: width - 40, marginHorizontal: 20, height: 200, borderRadius: 24, overflow: 'hidden', position: 'relative' },
    bannerImage: { width: '100%', height: '100%' },
    bannerOverlay: { position: 'absolute', bottom: 0, left: 0, right: 0, height: '60%', padding: 20, justifyContent: 'flex-end' },
    bannerTitle: { color: 'white', fontSize: 24, fontWeight: 'bold', marginBottom: 4 },
    bannerSubtitle: { color: 'rgba(255,255,255,0.8)', fontSize: 14, marginBottom: 12 },
    bannerBtn: { borderRadius: 12, alignSelf: 'flex-start', overflow: 'hidden' },
    bannerBtnGradient: { paddingHorizontal: 20, paddingVertical: 10 },
    bannerBtnText: { color: 'white', fontWeight: 'bold', fontSize: 13 },

    section: { marginTop: 10, marginBottom: 20 },
    sectionHeader: { flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center', paddingHorizontal: 20, marginBottom: 14 },
    sectionTitle: { fontSize: 18, fontWeight: 'bold', color: Colors.text.primary },
    seeAll: { color: Colors.primary, fontSize: 12, fontWeight: '600' },

    categoryTile: { alignItems: 'center', marginRight: 16, width: 70 },
    categoryIcon: { width: 64, height: 64, borderRadius: 20, backgroundColor: Colors.surface, justifyContent: 'center', alignItems: 'center', marginBottom: 8, shadowColor: '#000', shadowOffset: { width: 0, height: 5 }, shadowOpacity: 0.05, shadowRadius: 10 },
    selectedCategory: { backgroundColor: Colors.primary },
    categoryName: { fontSize: 11, fontWeight: '600', color: Colors.text.secondary, textAlign: 'center' },
    selectedCategoryText: { color: Colors.primary },

    list: { paddingBottom: 20 },
    columnWrapper: { justifyContent: 'space-between', paddingHorizontal: 20 },
});
