import React from 'react';
import { View, Text, FlatList, StyleSheet, TouchableOpacity, Image, SafeAreaView, StatusBar, TextInput, Platform } from 'react-native';
import { useCartStore } from '../store/cart';
import { Colors } from '../constants/Colors';
import { Minus, Plus, Trash2, ArrowLeft } from 'lucide-react-native';
import { LinearGradient } from 'expo-linear-gradient';

export default function CartScreen({ navigation }: any) {
    const { items, updateQuantity, removeItem, total } = useCartStore();

    const renderItem = ({ item }: { item: any }) => (
        <View style={styles.item}>
            <Image source={{ uri: item.image }} style={styles.image} />
            <View style={styles.info}>
                <Text style={styles.name} numberOfLines={2}>{item.name}</Text>
                <Text style={styles.price}>₹{Number(item.price).toFixed(0)}</Text>
            </View>

            <View style={styles.controls}>
                <TouchableOpacity
                    style={styles.qtyBtn}
                    onPress={() => item.quantity > 1 ? updateQuantity(item.id, item.quantity - 1) : removeItem(item.id)}
                >
                    <Minus size={14} color={Colors.primary} />
                </TouchableOpacity>
                <Text style={styles.qty}>{item.quantity}</Text>
                <TouchableOpacity
                    style={styles.qtyBtn}
                    onPress={() => updateQuantity(item.id, item.quantity + 1)}
                >
                    <Plus size={14} color={Colors.primary} />
                </TouchableOpacity>
            </View>

            <TouchableOpacity onPress={() => removeItem(item.id)} style={styles.delete}>
                <Trash2 size={18} color={Colors.status.error} />
            </TouchableOpacity>
        </View>
    );

    if (items.length === 0) {
        return (
            <SafeAreaView style={styles.container}>
                <View style={styles.header}>
                    <TouchableOpacity onPress={() => navigation.goBack()}><ArrowLeft size={24} color={Colors.text.primary} /></TouchableOpacity>
                    <Text style={styles.title}>Cart</Text>
                    <View style={{ width: 24 }} />
                </View>
                <View style={styles.emptyContainer}>
                    <Text style={{ fontSize: 60, marginBottom: 20 }}>🌸</Text>
                    <Text style={styles.emptyText}>Your cart is empty</Text>
                    <TouchableOpacity
                        style={styles.browseBtn}
                        onPress={() => navigation.navigate('Home')}
                    >
                        <Text style={styles.browseBtnText}>Start Shopping</Text>
                    </TouchableOpacity>
                </View>
            </SafeAreaView>
        );
    }

    return (
        <SafeAreaView style={styles.container}>
            <StatusBar barStyle="dark-content" />
            <View style={styles.header}>
                <TouchableOpacity onPress={() => navigation.goBack()}><ArrowLeft size={24} color={Colors.text.primary} /></TouchableOpacity>
                <Text style={styles.title}>My Cart ({items.length})</Text>
                <View style={{ width: 24 }} />
            </View>

            <FlatList
                data={items}
                keyExtractor={(item) => item.id}
                renderItem={renderItem}
                contentContainerStyle={styles.list}
            />

            <View style={styles.promoSection}>
                <Text style={styles.promoTitle}>Promo Code</Text>
                <View style={styles.promoInputRow}>
                    <TextInput
                        placeholder="Enter code"
                        placeholderTextColor={Colors.text.secondary}
                        style={styles.promoInput}
                    />
                    <TouchableOpacity style={styles.applyBtn}>
                        <Text style={styles.applyBtnText}>Apply</Text>
                    </TouchableOpacity>
                </View>
            </View>

            <View style={styles.footer}>
                <View style={styles.row}>
                    <Text style={styles.label}>Subtotal</Text>
                    <Text style={styles.value}>₹{total().toFixed(0)}</Text>
                </View>
                <View style={styles.row}>
                    <Text style={styles.label}>Delivery</Text>
                    <Text style={[styles.value, { color: Colors.status.success }]}>Free</Text>
                </View>

                <TouchableOpacity style={styles.checkoutBtnContainer} onPress={() => navigation.navigate('Orders')}>
                    <LinearGradient
                        colors={Colors.primaryGradient}
                        style={styles.checkoutBtn}
                    >
                        <View style={styles.checkoutBtnTextContainer}>
                            <Text style={styles.checkoutText}>Proceed to Checkout</Text>
                            <Text style={styles.totalText}>₹{total().toFixed(0)}</Text>
                        </View>
                    </LinearGradient>
                </TouchableOpacity>
            </View>
        </SafeAreaView>
    );
}

const styles = StyleSheet.create({
    container: { flex: 1, backgroundColor: Colors.background },
    header: { flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center', padding: 20 },
    title: { fontSize: 20, fontWeight: 'bold', color: Colors.text.primary },
    list: { padding: 20 },
    item: { flexDirection: 'row', alignItems: 'center', marginBottom: 20, backgroundColor: Colors.surface, padding: 12, borderRadius: 20 },
    image: { width: 70, height: 70, borderRadius: 16, backgroundColor: Colors.background },
    info: { flex: 1, marginLeft: 16 },
    name: { fontSize: 14, fontWeight: '600', color: Colors.text.primary, marginBottom: 4 },
    price: { fontSize: 16, fontWeight: 'bold', color: Colors.text.primary },
    controls: { flexDirection: 'row', alignItems: 'center', backgroundColor: 'rgba(0,0,0,0.03)', borderRadius: 20, height: 36, paddingHorizontal: 6, borderWidth: 1, borderColor: 'rgba(229, 9, 58, 0.1)' },
    qtyBtn: { width: 24, height: 24, justifyContent: 'center', alignItems: 'center' },
    qty: { fontSize: 14, fontWeight: 'bold', width: 24, textAlign: 'center', color: Colors.text.primary },
    delete: { padding: 8, marginLeft: 8 },
    promoSection: { padding: 24, backgroundColor: Colors.surface, borderTopLeftRadius: 30, borderTopRightRadius: 30 },
    promoTitle: { color: Colors.text.primary, fontWeight: '600', marginBottom: 12 },
    promoInputRow: { flexDirection: 'row', alignItems: 'center', gap: 12 },
    promoInput: { flex: 1, backgroundColor: 'white', padding: 12, borderRadius: 12, borderWidth: 1.5, borderColor: Colors.border, fontSize: 14 },
    applyBtn: { backgroundColor: Colors.primary, paddingHorizontal: 20, paddingVertical: 12, borderRadius: 12 },
    applyBtnText: { color: 'white', fontWeight: 'bold' },
    footer: { padding: 24, backgroundColor: Colors.surface, paddingBottom: Platform.OS === 'ios' ? 40 : 24 },
    row: { flexDirection: 'row', justifyContent: 'space-between', marginBottom: 10 },
    label: { fontSize: 14, color: Colors.text.secondary },
    value: { fontSize: 14, fontWeight: 'bold', color: Colors.text.primary },
    checkoutBtnContainer: { marginTop: 20, borderRadius: 20, overflow: 'hidden' },
    checkoutBtn: { padding: 18 },
    checkoutBtnTextContainer: { flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center' },
    checkoutText: { color: 'white', fontWeight: 'bold', fontSize: 16 },
    totalText: { color: 'white', fontWeight: '800', fontSize: 18 },
    emptyContainer: { flex: 1, justifyContent: 'center', alignItems: 'center', padding: 40 },
    emptyText: { fontSize: 18, color: Colors.text.primary, fontWeight: 'bold', marginBottom: 20 },
    browseBtn: { backgroundColor: Colors.primary, paddingHorizontal: 24, paddingVertical: 14, borderRadius: 16 },
    browseBtnText: { color: 'white', fontWeight: 'bold' },
});
