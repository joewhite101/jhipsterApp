package com.entando.service;

import com.entando.domain.Conference;

import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;

import java.util.Optional;

/**
 * Service Interface for managing {@link Conference}.
 */
public interface ConferenceService {

    /**
     * Save a conference.
     *
     * @param conference the entity to save.
     * @return the persisted entity.
     */
    Conference save(Conference conference);

    /**
     * Get all the conferences.
     *
     * @param pageable the pagination information.
     * @return the list of entities.
     */
    Page<Conference> findAll(Pageable pageable);


    /**
     * Get the "id" conference.
     *
     * @param id the id of the entity.
     * @return the entity.
     */
    Optional<Conference> findOne(Long id);

    /**
     * Delete the "id" conference.
     *
     * @param id the id of the entity.
     */
    void delete(Long id);
}
