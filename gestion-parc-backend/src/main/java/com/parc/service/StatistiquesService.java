package com.parc.service;

import com.parc.domain.enums.TypeTransaction;
import com.parc.repository.TransactionCarburantRepository;
import org.springframework.stereotype.Service;

@Service
public class StatistiquesService {

    private final TransactionCarburantRepository transactionRepository;

    // Constructeur explicite (remplace @RequiredArgsConstructor)
    public StatistiquesService(TransactionCarburantRepository transactionRepository) {
        this.transactionRepository = transactionRepository;
    }

    public Double getConsommationParc(Long parcId) {
        return transactionRepository.sumMontantByParc(parcId, TypeTransaction.CONSOMMATION);
    }

    public Double getConsommationVehicule(Long vehiculeId) {
        return transactionRepository.sumMontantByVehicule(vehiculeId, TypeTransaction.CONSOMMATION);
    }
}