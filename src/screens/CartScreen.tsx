import React from 'react';
import { View, Text, FlatList, StyleSheet, TouchableOpacity, Image, SafeAreaView } from 'react-native';
import { useCartStore } from '../store/cart';
import { Colors } from '../constants/Colors';
import { Minus, Plus, Trash2 } from 'lucide-react-native';

export default function CartScreen({ navigation }: any) {
    const { items, updateQuantity, removeItem, total } = useCartStore();

    const renderItem = ({ item }: { item: any }) => (
        <View style={styles.item}>
            <Image source={{ uri: item.image }} style={styles.image} />
            <View style={styles.info}>
                <Text style={styles.name} numberOfLines={2}>{item.name}</Text>
                <Text style={styles.price}>₹{Number(item.price).toFixed(2)}</Text>
            </View>

            <View style={styles.controls}>
                <TouchableOpacity
                    style={styles.qtyBtn}
                    onPress={() => item.quantity > 1 ? updateQuantity(item.id, item.quantity - 1) : removeItem(item.id)}
                >
                    <Minus size={16} color={Colors.text.secondary} />
                </TouchableOpacity>
                <Text style={styles.qty}>{item.quantity}</Text>
                <TouchableOpacity
                    style={styles.qtyBtn}
                    onPress={() => updateQuantity(item.id, item.quantity + 1)}
                >
                    <Plus size={16} color={Colors.text.primary} />
                </TouchableOpacity>
            </View>

            <TouchableOpacity onPress={() => removeItem(item.id)} style={styles.delete}>
                <Trash2 size={18} color="#EF4444" />
            </TouchableOpacity>
        </View>
    );

    return (
        <SafeAreaView style={styles.container}>
            <View style={styles.header}>
                <Text style={styles.title}>My Cart ({items.length})</Text>
            </View>

            <FlatList
                data={items}
                keyExtractor={(item) => item.id}
                renderItem={renderItem}
                contentContainerStyle={styles.list}
            />

            <View style={styles.footer}>
                <View style={styles.row}>
                    <Text style={styles.label}>Subtotal</Text>
                    <Text style={styles.value}>₹{total().toFixed(2)}</Text>
                </View>
                <View style={styles.row}>
                    <Text style={styles.label}>Delivery</Text>
                    <Text style={[styles.value, { color: Colors.status.success }]}>Free</Text>
                </View>
                <TouchableOpacity style={styles.checkoutBtn}>
                    <Text style={styles.checkoutText}>Checkout • ₹{total().toFixed(2)}</Text>
                </TouchableOpacity>
            </View>
        </SafeAreaView>
    );
}

const styles = StyleSheet.create({
    container: { flex: 1, backgroundColor: 'white' },
    header: { padding: 16, borderBottomWidth: 1, borderBottomColor: '#F3F4F6' },
    title: { fontSize: 20, fontWeight: 'bold' },
    list: { padding: 16 },
    item: { flexDirection: 'row', alignItems: 'center', marginBottom: 20 },
    image: { width: 64, height: 64, borderRadius: 8, backgroundColor: '#F3F4F6' },
    info: { flex: 1, marginLeft: 12 },
    name: { fontSize: 14, fontWeight: '500', color: Colors.text.primary, marginBottom: 4 },
    price: { fontSize: 14, fontWeight: 'bold', color: Colors.primary },
    controls: { flexDirection: 'row', alignItems: 'center', backgroundColor: '#F3F4F6', borderRadius: 8, height: 32 },
    qtyBtn: { width: 32, height: 32, justifyContent: 'center', alignItems: 'center' },
    qty: { fontSize: 13, fontWeight: '600', width: 20, textAlign: 'center' },
    delete: { padding: 8, marginLeft: 8 },
    footer: { padding: 16, borderTopWidth: 1, borderTopColor: '#F3F4F6', backgroundColor: 'white' },
    row: { flexDirection: 'row', justifyContent: 'space-between', marginBottom: 12 },
    label: { fontSize: 14, color: Colors.text.secondary },
    value: { fontSize: 14, fontWeight: 'bold', color: Colors.text.primary },
    checkoutBtn: { backgroundColor: Colors.primary, padding: 16, borderRadius: 12, alignItems: 'center', marginTop: 12 },
    checkoutText: { color: 'white', fontWeight: 'bold', fontSize: 16 },
});
