-- Schema-Erweiterung für Skills (v3)

CREATE TABLE skills (
                        id BIGSERIAL PRIMARY KEY,
                        name VARCHAR(100) NOT NULL UNIQUE,
                        level INTEGER NOT NULL DEFAULT 0,
                        created_at TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP,
                        updated_at TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP
);

CREATE TABLE skill_descriptions (
                                    id BIGSERIAL PRIMARY KEY,
                                    skill_id BIGINT NOT NULL,
                                    description TEXT NOT NULL,
                                    display_order INTEGER NOT NULL DEFAULT 0,

                                    CONSTRAINT fk_skill_descriptions_skill
                                        FOREIGN KEY (skill_id)
                                            REFERENCES skills (id)
                                            ON DELETE CASCADE
);

CREATE TABLE skill_technologies (
                                    skill_id BIGINT NOT NULL,
                                    technology VARCHAR(100) NOT NULL,

                                    CONSTRAINT fk_skill_technologies_skill
                                        FOREIGN KEY (skill_id)
                                            REFERENCES skills (id)
                                            ON DELETE CASCADE
);