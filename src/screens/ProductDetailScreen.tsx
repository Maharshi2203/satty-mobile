import React, { useState } from 'react';
import { View, Text, Image, StyleSheet, ScrollView, TouchableOpacity, SafeAreaView, StatusBar, Dimensions, Platform } from 'react-native';
import { Colors } from '../constants/Colors';
import { useCartStore } from '../store/cart';
import { ArrowLeft, Share2, Heart, Plus, Minus, Star, ChevronRight } from 'lucide-react-native';
import { LinearGradient } from 'expo-linear-gradient';

const { width } = Dimensions.get('window');

export default function ProductDetailScreen({ route, navigation }: any) {
    const { product } = route.params;
    const { items, addItem, updateQuantity, removeItem } = useCartStore();
    const cartItem = items.find(i => i.id === String(product.id));
    const [liked, setLiked] = useState(false);

    const price = Number(product.final_price);

    const handleAdd = () => {
        if (!cartItem) {
            addItem({
                id: String(product.id),
                name: product.name,
                price: price,
                image: product.image_url,
                quantity: 1,
            });
        }
    };

    return (
        <SafeAreaView style={styles.container}>
            <StatusBar barStyle="dark-content" />
            <ScrollView showsVerticalScrollIndicator={false}>
                <View style={styles.header}>
                    <TouchableOpacity onPress={() => navigation.goBack()} style={styles.iconBtn}>
                        <ArrowLeft size={22} color={Colors.text.primary} />
                    </TouchableOpacity>
                    <View style={styles.headerRight}>
                        <TouchableOpacity style={styles.iconBtn} onPress={() => setLiked(!liked)}>
                            <Heart size={20} color={liked ? Colors.primary : Colors.text.primary} fill={liked ? Colors.primary : "transparent"} />
                        </TouchableOpacity>
                        <TouchableOpacity style={styles.iconBtn}>
                            <Share2 size={20} color={Colors.text.primary} />
                        </TouchableOpacity>
                    </View>
                </View>

                <View style={styles.imageWrapper}>
                    <Image source={{ uri: product.image_url }} style={styles.image} resizeMode="contain" />
                </View>

                <View style={styles.content}>
                    <View style={styles.badgeRow}>
                        <Text style={styles.brandBadge}>SATTYS PREMIUM</Text>
                        <View style={styles.ratingBox}>
                            <Star size={14} color="#F2C94C" fill="#F2C94C" />
                            <Text style={styles.ratingText}>4.9 (2.1k Reviews)</Text>
                        </View>
                    </View>

                    <Text style={styles.name}>{product.name}</Text>
                    <Text style={styles.price}>₹{price.toFixed(0)}</Text>

                    <Text style={styles.description}>
                        {product.description || `Discover the exceptional quality and flavor of our hand-picked ${product.name}. Carefully sourced and packed to ensure the highest standards of purity and freshness for your kitchen.`}
                    </Text>

                    <View style={styles.divider} />

                    <Text style={styles.sectionTitle}>Product Information</Text>
                    <View style={styles.specGrid}>
                        <SpecItem label="Weight" value={product.pack_size || "500g"} />
                        <SpecItem label="Shelf Life" value="12 Months" />
                        <SpecItem label="Type" value="Organic" />
                        <SpecItem label="Origin" value="India" />
                    </View>

                    <TouchableOpacity style={styles.reviewBtn}>
                        <Text style={styles.reviewBtnText}>Delivery & Returns</Text>
                        <ChevronRight size={20} color={Colors.text.muted} />
                    </TouchableOpacity>
                </View>
            </ScrollView>

            <View style={styles.footer}>
                <View style={styles.footerInner}>
                    <View style={styles.qtyContainer}>
                        {cartItem ? (
                            <View style={styles.qtyControl}>
                                <TouchableOpacity onPress={() => cartItem.quantity > 1 ? updateQuantity(cartItem.id, cartItem.quantity - 1) : removeItem(cartItem.id)} style={styles.qtyBtn}>
                                    <Minus size={18} color={Colors.primary} />
                                </TouchableOpacity>
                                <Text style={styles.qtyText}>{cartItem.quantity}</Text>
                                <TouchableOpacity onPress={() => updateQuantity(cartItem.id, cartItem.quantity + 1)} style={styles.qtyBtn}>
                                    <Plus size={18} color={Colors.primary} />
                                </TouchableOpacity>
                            </View>
                        ) : (
                            <View style={styles.priceInfo}>
                                <Text style={styles.priceLabel}>Unit Price</Text>
                                <Text style={styles.totalPrice}>₹{price.toFixed(0)}</Text>
                            </View>
                        )}
                    </View>

                    <TouchableOpacity
                        style={styles.addBtnContainer}
                        onPress={handleAdd}
                        disabled={!!cartItem}
                    >
                        <LinearGradient
                            colors={cartItem ? ['#D8C7C3', '#D8C7C3'] : Colors.primaryGradient}
                            style={styles.addBtn}
                        >
                            <Text style={[styles.addText, cartItem && { color: Colors.text.muted }]}>
                                {cartItem ? 'In Cart' : 'Add to Cart'}
                            </Text>
                        </LinearGradient>
                    </TouchableOpacity>
                </View>
            </View>
        </SafeAreaView>
    );
}

function SpecItem({ label, value }: { label: string, value: string }) {
    return (
        <View style={styles.specItem}>
            <Text style={styles.specLabel}>{label}</Text>
            <Text style={styles.specValue}>{value}</Text>
        </View>
    );
}

const styles = StyleSheet.create({
    container: { flex: 1, backgroundColor: Colors.background },
    header: { flexDirection: 'row', justifyContent: 'space-between', padding: 16, position: 'absolute', top: 0, left: 0, right: 0, zIndex: 10 },
    headerRight: { flexDirection: 'row', gap: 12 },
    iconBtn: { width: 44, height: 44, borderRadius: 22, backgroundColor: 'rgba(255,255,255,0.7)', justifyContent: 'center', alignItems: 'center' },
    imageWrapper: { width: width, height: 400, backgroundColor: Colors.surface, justifyContent: 'center', alignItems: 'center', borderBottomLeftRadius: 40, borderBottomRightRadius: 40 },
    image: { width: '80%', height: '80%' },
    content: { padding: 24, paddingBottom: 120 },
    badgeRow: { flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center', marginBottom: 16 },
    brandBadge: { color: Colors.primary, fontSize: 10, fontWeight: 'bold', letterSpacing: 1 },
    ratingBox: { flexDirection: 'row', alignItems: 'center', gap: 6 },
    ratingText: { color: Colors.text.secondary, fontSize: 13, fontWeight: '500' },
    name: { fontSize: 28, fontWeight: 'bold', color: Colors.text.primary, marginBottom: 8 },
    price: { fontSize: 24, fontWeight: '800', color: Colors.text.primary, marginBottom: 20 },
    description: { fontSize: 15, color: Colors.text.secondary, lineHeight: 24, marginBottom: 24 },
    divider: { height: 1, backgroundColor: 'rgba(0,0,0,0.05)', marginVertical: 10 },
    sectionTitle: { fontSize: 18, fontWeight: 'bold', color: Colors.text.primary, marginBottom: 16, marginTop: 10 },
    specGrid: { flexDirection: 'row', flexWrap: 'wrap', gap: 12 },
    specItem: { width: '47%', padding: 16, backgroundColor: Colors.surface, borderRadius: 20 },
    specLabel: { fontSize: 12, color: Colors.text.secondary, marginBottom: 4 },
    specValue: { fontSize: 14, fontWeight: '600', color: Colors.text.primary },
    reviewBtn: { flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center', paddingVertical: 15, borderTopWidth: 1, borderTopColor: 'rgba(0,0,0,0.05)', marginTop: 20 },
    reviewBtnText: { fontSize: 16, fontWeight: '600', color: Colors.text.primary },
    footer: { position: 'absolute', bottom: 0, left: 0, right: 0, backgroundColor: Colors.background, padding: 16, paddingBottom: Platform.OS === 'ios' ? 32 : 16 },
    footerInner: { flexDirection: 'row', alignItems: 'center', gap: 16 },
    qtyContainer: { flex: 0.4 },
    qtyControl: { flexDirection: 'row', alignItems: 'center', justifyContent: 'space-between', backgroundColor: Colors.surface, borderRadius: 25, height: 50, paddingHorizontal: 10, borderWidth: 1, borderColor: Colors.primary },
    qtyBtn: { width: 34, height: 34, borderRadius: 17, justifyContent: 'center', alignItems: 'center' },
    qtyText: { fontSize: 18, fontWeight: 'bold', color: Colors.text.primary },
    priceInfo: { paddingLeft: 8 },
    priceLabel: { fontSize: 12, color: Colors.text.secondary },
    totalPrice: { fontSize: 20, fontWeight: 'bold', color: Colors.text.primary },
    addBtnContainer: { flex: 0.6, height: 56, borderRadius: 28, overflow: 'hidden' },
    addBtn: { width: '100%', height: '100%', justifyContent: 'center', alignItems: 'center' },
    addText: { color: 'white', fontWeight: 'bold', fontSize: 16 },
});
