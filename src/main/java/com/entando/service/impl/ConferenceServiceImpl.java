package com.entando.service.impl;

import com.entando.service.ConferenceService;
import com.entando.domain.Conference;
import com.entando.repository.ConferenceRepository;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;

import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.util.Optional;

/**
 * Service Implementation for managing {@link Conference}.
 */
@Service
@Transactional
public class ConferenceServiceImpl implements ConferenceService {

    private final Logger log = LoggerFactory.getLogger(ConferenceServiceImpl.class);

    private final ConferenceRepository conferenceRepository;

    public ConferenceServiceImpl(ConferenceRepository conferenceRepository) {
        this.conferenceRepository = conferenceRepository;
    }

    /**
     * Save a conference.
     *
     * @param conference the entity to save.
     * @return the persisted entity.
     */
    @Override
    public Conference save(Conference conference) {
        log.debug("Request to save Conference : {}", conference);
        return conferenceRepository.save(conference);
    }

    /**
     * Get all the conferences.
     *
     * @param pageable the pagination information.
     * @return the list of entities.
     */
    @Override
    @Transactional(readOnly = true)
    public Page<Conference> findAll(Pageable pageable) {
        log.debug("Request to get all Conferences");
        return conferenceRepository.findAll(pageable);
    }


    /**
     * Get one conference by id.
     *
     * @param id the id of the entity.
     * @return the entity.
     */
    @Override
    @Transactional(readOnly = true)
    public Optional<Conference> findOne(Long id) {
        log.debug("Request to get Conference : {}", id);
        return conferenceRepository.findById(id);
    }

    /**
     * Delete the conference by id.
     *
     * @param id the id of the entity.
     */
    @Override
    public void delete(Long id) {
        log.debug("Request to delete Conference : {}", id);
        conferenceRepository.deleteById(id);
    }
}
