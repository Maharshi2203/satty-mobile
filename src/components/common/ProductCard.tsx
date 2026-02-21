import React from 'react';
import { View, Text, StyleSheet, TouchableOpacity } from 'react-native';
import { Image } from 'expo-image';
import { Colors } from '../../constants/Colors';
import { useCartStore } from '../../store/cart';
import { Check, Plus } from 'lucide-react-native';

interface Product {
    id: number | string;
    name: string;
    final_price: string; // API string
    image_url: string;
    stock_status?: string;
}

interface Props {
    product: Product;
    onPress: () => void;
}

export const ProductCard = ({ product, onPress }: Props) => {
    const { addItem, items } = useCartStore();
    const price = Number(product.final_price);
    const isOut = product.stock_status === 'OUT';
    const inCart = items.find(i => i.id === String(product.id));

    const handleAdd = () => {
        if (isOut) return;
        addItem({
            id: String(product.id),
            name: product.name,
            price,
            image: product.image_url,
            quantity: 1
        });
    };

    return (
        <TouchableOpacity activeOpacity={0.9} onPress={onPress} style={styles.card}>
            <View style={styles.imageContainer}>
                <Image
                    source={{ uri: product.image_url }}
                    style={styles.image}
                    contentFit="contain"
                    transition={200}
                />
                {isOut && <View style={styles.badge}><Text style={styles.badgeText}>OUT</Text></View>}
            </View>

            <View style={styles.content}>
                <Text style={styles.brandTitle}>SATTYS</Text>
                <Text numberOfLines={2} style={styles.name}>{product.name}</Text>

                <View style={styles.footerRow}>
                    <Text style={styles.price}>₹{price.toFixed(0)}</Text>
                    <TouchableOpacity
                        style={[styles.addButton, inCart && styles.addedButton]}
                        onPress={handleAdd}
                        disabled={isOut}
                    >
                        {inCart ? (
                            <Check size={16} color="white" />
                        ) : (
                            <Plus size={16} color={isOut ? '#CCC' : Colors.primary} />
                        )}
                    </TouchableOpacity>
                </View>
            </View>
        </TouchableOpacity>
    );
};

const styles = StyleSheet.create({
    card: {
        backgroundColor: Colors.surface,
        borderRadius: 24,
        marginBottom: 16,
        width: '47%',
        overflow: 'hidden',
        shadowColor: '#000',
        shadowOffset: { width: 0, height: 4 },
        shadowOpacity: 0.05,
        shadowRadius: 10,
        elevation: 2,
    },
    imageContainer: {
        height: 140,
        backgroundColor: 'rgba(233, 214, 210, 0.3)',
        justifyContent: 'center',
        alignItems: 'center',
        position: 'relative',
    },
    image: {
        width: '80%',
        height: '80%',
    },
    brandTitle: {
        fontSize: 10,
        fontWeight: 'bold',
        color: Colors.primary,
        letterSpacing: 1,
        marginBottom: 4,
    },
    badge: {
        position: 'absolute',
        top: 8,
        left: 8,
        backgroundColor: Colors.status.error,
        paddingHorizontal: 6,
        paddingVertical: 2,
        borderRadius: 4,
    },
    badgeText: {
        color: 'white',
        fontSize: 10,
        fontWeight: 'bold',
    },
    content: {
        padding: 12,
    },
    name: {
        fontSize: 14,
        fontWeight: '600',
        color: Colors.text.primary,
        marginBottom: 8,
        height: 40,
    },
    footerRow: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
    },
    price: {
        fontSize: 16,
        fontWeight: 'bold',
        color: Colors.text.primary,
    },
    addButton: {
        width: 32,
        height: 32,
        borderRadius: 16,
        borderWidth: 1.5,
        borderColor: Colors.primary,
        justifyContent: 'center',
        alignItems: 'center',
    },
    addedButton: {
        backgroundColor: Colors.primary,
        borderColor: Colors.primary,
    },
});
