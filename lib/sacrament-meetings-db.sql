-- ============================================================
-- 1. CREATE MEETINGS TABLE
-- ============================================================

CREATE TABLE IF NOT EXISTS meetings (
  id             SERIAL        PRIMARY KEY,
  date           DATE          NOT NULL UNIQUE,
  meeting_type   VARCHAR(20)   NOT NULL
                               CHECK (
                                 meeting_type IN (
                                   'testimony',
                                   'regular',
                                   'stake',
                                   'general',
                                   'special'
                                 )
                               ),
  presiding      VARCHAR(255)  NOT NULL,
  conducting     VARCHAR(255)  NOT NULL,
  announcements  TEXT[]        DEFAULT '{}',
  opening_hymn   JSONB         NOT NULL,
  opening_prayer VARCHAR(255)  NOT NULL,
  ward_business  JSONB         DEFAULT '[]',
  stake_business BOOLEAN       DEFAULT false,
  sacrament_hymn JSONB         NOT NULL,
  speakers       JSONB         DEFAULT '[]',
  closing_hymn   JSONB         NOT NULL,
  closing_prayer VARCHAR(255)  NOT NULL
);


-- ============================================================
-- 2. SEED MEETINGS
-- ============================================================

INSERT INTO meetings (
  date,
  meeting_type,
  presiding,
  conducting,
  announcements,
  opening_hymn,
  opening_prayer,
  ward_business,
  stake_business,
  sacrament_hymn,
  speakers,
  closing_hymn,
  closing_prayer
)
VALUES

-- ============================================================
-- MEETING 1
-- ============================================================

(
  '2026-01-04',
  'testimony',
  'Bishop Thompson',
  'Brother Nakamura',
  ARRAY[]::TEXT[],
  '{"number":134,"title":"I Believe in Christ"}',
  'Sister Park',
  '[]',
  false,
  '{"number":175,"title":"God, Our Father, Hear Us Pray"}',
  '[]',
  '{"number":219,"title":"Because I Have Been Given Much"}',
  'Brother Alvarez'
),

-- ============================================================
-- MEETING 2
-- ============================================================

(
  '2026-01-11',
  'regular',
  'Bishop Thompson',
  'Brother Nakamura',
  ARRAY['Ward temple night: Jan 30'],
  '{"number":2,"title":"The Spirit of God"}',
  'Sister Ramirez',
  '[{"description":"Sustaining of new Sunday School president"}]',
  true,
  '{"number":169,"title":"In Remembrance of Thy Suffering"}',
  '[
    {
      "name":"Sister Chen",
      "topic":"The Sacrament",
      "type":"speaker"
    },
    {
      "name":"Brother Osei",
      "topic":"Covenant Keeping",
      "type":"speaker"
    }
  ]',
  '{"number":31,"title":"O God, Our Help in Ages Past"}',
  'Brother Lewis'
),

-- ============================================================
-- MEETING 3
-- ============================================================

(
  '2026-01-18',
  'regular',
  'Bishop Thompson',
  'Sister Torres',
  ARRAY['Ministering interviews this week'],
  '{"number":85,"title":"How Firm a Foundation"}',
  'Brother Kim',
  '[
    {
      "description":"Release - Sister Martinez - Primary Teacher"
    },
    {
      "description":"Sustain - Sister Agbavor - Primary Teacher"
    },
    {
      "description":"Sustain - Sister Mukiwa - RS 2nd Counselor"
    }
  ]',
  false,
  '{"number":173,"title":"While of These Emblems We Partake"}',
  '[
    {
      "name":"Sister Nakamura",
      "topic":"Personal Revelation",
      "type":"speaker"
    },
    {
      "name":"Youth Choir",
      "topic":"",
      "type":"musical-number"
    },
    {
      "name":"Brother Santos",
      "topic":"Temple Covenants",
      "type":"speaker"
    }
  ]',
  '{"number":226,"title":"Improve the Shining Moments"}',
  'Sister Jensen'
),

-- ============================================================
-- MEETING 4
-- ============================================================

(
  '2026-01-25',
  'stake',
  'President Gimenez',
  'President Gimenez',
  ARRAY['Stake conference begins at 10:00 AM'],
  '{"number":3,"title":"Now Let Us Rejoice"}',
  'Brother Carter',
  '[]',
  true,
  '{"number":175,"title":"O God, the Eternal Father"}',
  '[
    {
      "name":"President Gimenez",
      "topic":"Building Zion",
      "type":"speaker"
    }
  ]',
  '{"number":134,"title":"I Believe in Christ"}',
  'Sister Green'
),

-- ============================================================
-- MEETING 5
-- ============================================================

(
  '2026-02-01',
  'general',
  'Bishop Thompson',
  'Brother Lewis',
  ARRAY['General Conference preparation meeting next Sunday'],
  '{"number":1,"title":"The Morning Breaks"}',
  'Sister Evans',
  '[]',
  false,
  '{"number":170,"title":"God, Our Father, Hear Us Pray"}',
  '[
    {
      "name":"Brother Alvarez",
      "topic":"Faith in Jesus Christ",
      "type":"speaker"
    },
    {
      "name":"Sister Park",
      "topic":"Following the Savior",
      "type":"speaker"
    }
  ]',
  '{"number":304,"title":"Teach Me to Walk in the Light"}',
  'Brother Kim'
),

-- ============================================================
-- MEETING 6
-- ============================================================

(
  '2026-02-08',
  'regular',
  'Bishop Thompson',
  'Sister Torres',
  ARRAY['Youth activity this Saturday'],
  '{"number":98,"title":"I Need Thee Every Hour"}',
  'Brother Santos',
  '[
    {
      "description":"Sustaining of new Young Women presidency"
    }
  ]',
  false,
  '{"number":174,"title":"While of These Emblems We Partake"}',
  '[
    {
      "name":"Sister Martinez",
      "topic":"Prayer and Revelation",
      "type":"speaker"
    },
    {
      "name":"Brother Nakamura",
      "topic":"Service",
      "type":"speaker"
    }
  ]',
  '{"number":152,"title":"God Be with You Till We Meet Again"}',
  'Sister Chen'
),

-- ============================================================
-- MEETING 7
-- ============================================================

(
  '2026-02-15',
  'testimony',
  'Bishop Thompson',
  'Brother Osei',
  ARRAY[]::TEXT[],
  '{"number":19,"title":"We Thank Thee, O God, for a Prophet"}',
  'Sister Ramirez',
  '[]',
  false,
  '{"number":173,"title":"While of These Emblems We Partake"}',
  '[]',
  '{"number":85,"title":"How Firm a Foundation"}',
  'Brother Lewis'
),

-- ============================================================
-- MEETING 8
-- ============================================================

(
  '2026-02-22',
  'special',
  'President Gimenez',
  'Bishop Thompson',
  ARRAY['Special ward devotional immediately following sacrament meeting'],
  '{"number":89,"title":"The Lord Is My Light"}',
  'Sister Nakamura',
  '[
    {
      "description":"Special presentation from the youth"
    }
  ]',
  true,
  '{"number":169,"title":"In Remembrance of Thy Suffering"}',
  '[
    {
      "name":"Sister Agbavor",
      "topic":"The Power of Covenants",
      "type":"speaker"
    },
    {
      "name":"Ward Choir",
      "topic":"Come, Listen to a Prophets Voice",
      "type":"musical-number"
    }
  ]',
  '{"number":31,"title":"O God, Our Help in Ages Past"}',
  'Brother Santos'
);