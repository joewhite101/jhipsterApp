
package com.entando.config;

import org.entando.config.ConfigService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.Optional;

@Service
public class JhipsterAppConfigManager {

    private final ConfigService<JhipsterAppConfig> configService;

    @Autowired
    public JhipsterAppConfigManager(final ConfigService<JhipsterAppConfig> configService) {
        this.configService = configService;
    }

    public JhipsterAppConfig getJhipsterAppConfig() {
        return Optional.ofNullable(configService.getConfig())
            .orElseGet(JhipsterAppConfig::getDefault);
    }

    public void update(JhipsterAppConfig jhipsterAppConfig) {
        configService.updateConfig(jhipsterAppConfig);
    }

}

