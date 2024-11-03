export const tableColumnsPerTable = {
    'ADMIN': [
        'id',
        'username',
        'password',
    ],
    'VOTER': [
        'id',
        'token_id'
    ],
    'VOTER_TOKEN': [
        'id',
        'token',
        'inuse'
    ],
    'ELECTION' : [
        'id',
        'election_name',
        'election_description',
        'election_type',
        'election_startdate',
        'election_enddate'
    ],
    'CANDIDATE' : [
        'id',
        'candidate_name',
        'party_filiation',
        'runs_for',
        'participates_in',
    ],
    'PARTICIPATING_CANDIDATES': [
        'id',
        'candidate_id',
        'election_id',
    ]
}