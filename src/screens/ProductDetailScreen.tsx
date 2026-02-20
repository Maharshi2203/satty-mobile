import React from 'react';
import { View, Text, Image, StyleSheet, ScrollView, TouchableOpacity, SafeAreaView } from 'react-native';
import { Colors } from '../constants/Colors';
import { useCartStore } from '../store/cart';
import { ArrowLeft, Share2, Heart, Plus, Minus, Check } from 'lucide-react-native';

export default function ProductDetailScreen({ route, navigation }: any) {
    const { product } = route.params;
    const { items, addItem, updateQuantity, removeItem } = useCartStore();
    const cartItem = items.find(i => i.id === String(product.id));

    const handleAdd = () => {
        if (!cartItem) {
            addItem({
                id: String(product.id),
                name: product.name,
                price: Number(product.final_price),
                image: product.image_url,
                quantity: 1,
            });
        }
    };

    return (
        <SafeAreaView style={{ flex: 1, backgroundColor: 'white' }}>
            <ScrollView>
                <View style={styles.header}>
                    <TouchableOpacity onPress={() => navigation.goBack()} style={styles.backBtn}>
                        <ArrowLeft size={24} color={Colors.text.primary} />
                    </TouchableOpacity>
                </View>

                <Image source={{ uri: product.image_url }} style={styles.image} resizeMode="contain" />

                <View style={styles.content}>
                    <Text style={styles.brand}>{product.brand_name || "Satty's"}</Text>
                    <Text style={styles.name}>{product.name}</Text>

                    <View style={styles.ratingRow}>
                        <Text style={styles.rating}>⭐ 4.5</Text>
                        <Text style={styles.reviews}>(128 reviews)</Text>
                    </View>

                    <Text style={styles.description}>
                        {product.description || `Premium quality ${product.name}. Freshly sourced and packed.`}
                    </Text>

                    <View style={styles.specs}>
                        <View style={styles.specItem}>
                            <Text style={styles.specLabel}>Pack Size</Text>
                            <Text style={styles.specValue}>{product.pack_size || 'Standard'}</Text>
                        </View>
                        <View style={styles.specItem}>
                            <Text style={styles.specLabel}>Shelf Life</Text>
                            <Text style={styles.specValue}>{product.shelf_life || '6 Months'}</Text>
                        </View>
                    </View>
                </View>
            </ScrollView>

            <View style={styles.footer}>
                <View>
                    <Text style={styles.priceLabel}>Price</Text>
                    <Text style={styles.price}>₹{Number(product.final_price).toFixed(2)}</Text>
                </View>

                {cartItem ? (
                    <View style={styles.qtyControl}>
                        <TouchableOpacity onPress={() => cartItem.quantity > 1 ? updateQuantity(cartItem.id, cartItem.quantity - 1) : removeItem(cartItem.id)} style={styles.qtyBtn}>
                            <Minus size={20} color={Colors.text.primary} />
                        </TouchableOpacity>
                        <Text style={styles.qtyText}>{cartItem.quantity}</Text>
                        <TouchableOpacity onPress={() => updateQuantity(cartItem.id, cartItem.quantity + 1)} style={styles.qtyBtn}>
                            <Plus size={20} color={Colors.text.primary} />
                        </TouchableOpacity>
                    </View>
                ) : (
                    <TouchableOpacity onPress={handleAdd} style={styles.addBtn}>
                        <Text style={styles.addText}>Add to Cart</Text>
                    </TouchableOpacity>
                )}
            </View>
        </SafeAreaView>
    );
}

const styles = StyleSheet.create({
    header: { padding: 16, position: 'absolute', top: 0, left: 0, zIndex: 10 },
    backBtn: { width: 40, height: 40, borderRadius: 20, backgroundColor: 'white', justifyContent: 'center', alignItems: 'center', shadowColor: '#000', shadowOpacity: 0.1, shadowRadius: 4, elevation: 4 },
    image: { width: '100%', height: 300, backgroundColor: '#F8F8F8' },
    content: { padding: 20, paddingBottom: 100 },
    brand: { fontSize: 12, fontWeight: '700', color: Colors.primary, letterSpacing: 1, marginBottom: 8, textTransform: 'uppercase' },
    name: { fontSize: 24, fontWeight: 'bold', color: Colors.text.primary, marginBottom: 12, lineHeight: 32 },
    ratingRow: { flexDirection: 'row', alignItems: 'center', marginBottom: 20 },
    rating: { fontSize: 14, fontWeight: 'bold', color: Colors.text.primary, marginRight: 8 },
    reviews: { fontSize: 14, color: Colors.text.secondary },
    description: { fontSize: 15, color: Colors.text.secondary, lineHeight: 24, marginBottom: 24 },
    specs: { flexDirection: 'row', gap: 20, marginBottom: 20 },
    specItem: { padding: 12, backgroundColor: '#F8F8F8', borderRadius: 8, flex: 1 },
    specLabel: { fontSize: 12, color: Colors.text.muted, marginBottom: 4 },
    specValue: { fontSize: 14, fontWeight: '600', color: Colors.text.primary },

    footer: { position: 'absolute', bottom: 0, left: 0, right: 0, backgroundColor: 'white', padding: 16, borderTopWidth: 1, borderTopColor: '#F3F4F6', flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center' },
    priceLabel: { fontSize: 12, color: Colors.text.muted },
    price: { fontSize: 24, fontWeight: 'bold', color: Colors.text.primary },

    addBtn: { backgroundColor: Colors.primary, paddingHorizontal: 32, paddingVertical: 14, borderRadius: 12 },
    addText: { color: 'white', fontWeight: 'bold', fontSize: 16 },

    qtyControl: { flexDirection: 'row', alignItems: 'center', backgroundColor: '#F3F4F6', borderRadius: 12, height: 48 },
    qtyBtn: { width: 48, height: 48, justifyContent: 'center', alignItems: 'center' },
    qtyText: { width: 24, textAlign: 'center', fontSize: 16, fontWeight: 'bold' },
});
