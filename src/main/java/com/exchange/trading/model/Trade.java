package com.exchange.trading.model;

import jakarta.persistence.*;
import lombok.Data;
import java.math.BigDecimal;
import java.time.LocalDateTime;

@Entity
@Data
public class Trade {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    private String userId;
    private String symbol;
    private BigDecimal quantity;
    private BigDecimal price;
    private LocalDateTime timestamp = LocalDateTime.now();
}