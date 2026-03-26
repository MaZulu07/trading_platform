package com.exchange.trading.service;

import com.exchange.trading.model.Wallet;
import com.exchange.trading.repository.WalletRepository;
import org.springframework.stereotype.Service;

import java.math.BigDecimal;
import java.util.List;

@Service
public class WalletService {

    private final WalletRepository walletRepository;

    public WalletService(WalletRepository walletRepository) {
        this.walletRepository = walletRepository;
    }

    public Wallet createWallet(String userId) {
        Wallet wallet = new Wallet();
        wallet.setUserId(userId);
        wallet.setBalance(BigDecimal.ZERO);
        return walletRepository.save(wallet);
    }

    public Wallet getWallet(String userId) {
        return walletRepository.findByUserId(userId)
                .orElseGet(() -> createWallet(userId));
    }

    public List<Wallet> getAllWallets() {
        return walletRepository.findAll();
    }

    public Wallet updateWallet(Wallet wallet) {
        return walletRepository.save(wallet);
    }
}