export function parseInput() {
    const input = realInput; // testInput realInput
    return input.split('\n').map(x => x.split(' ').map(Number));
}

const testInput = `7 6 4 2 1
1 2 7 8 9
9 7 6 2 1
1 3 2 4 5
8 6 4 4 1
1 3 6 7 9`

const realInput = `62 65 67 70 73 76 75
68 71 73 76 78 78
77 80 81 82 86
44 47 48 51 53 58
51 53 56 57 59 56 57 60
68 70 71 69 72 74 71
59 61 63 66 64 66 66
55 56 55 58 61 63 64 68
3 4 5 8 11 9 10 17
16 18 18 21 22
70 71 73 73 74 76 78 75
16 17 20 20 23 23
10 12 12 15 16 17 21
50 53 56 56 63
25 26 29 33 36
52 54 56 57 60 64 66 63
59 60 63 66 70 73 73
42 43 45 47 51 54 58
69 71 72 73 75 79 86
13 16 17 24 25 28 31 33
9 10 17 19 16
6 7 8 15 18 18
17 18 24 27 31
20 21 23 30 36
27 24 25 26 28 31 34
29 26 28 30 31 34 33
86 83 84 86 87 89 91 91
81 79 80 83 85 89
56 55 57 59 66
49 48 46 47 49
77 76 77 76 74
42 41 44 43 46 46
86 85 86 85 88 92
16 13 14 11 16
34 32 32 35 36 39 41
36 34 35 36 36 38 35
8 6 8 8 10 13 13
17 15 15 18 21 25
18 17 17 18 25
85 84 86 88 89 93 96
37 36 40 41 38
25 22 24 28 29 29
70 68 71 74 78 82
16 13 14 15 17 21 27
58 57 62 63 65 66 68
84 81 84 85 90 88
67 66 68 74 75 78 78
68 66 73 76 80
38 35 41 43 45 46 52
63 63 64 67 69 70 71 74
28 28 31 33 31
43 43 44 47 48 49 52 52
68 68 69 72 74 75 79
60 60 62 65 67 70 76
38 38 37 38 40
18 18 21 22 25 23 22
19 19 16 17 19 20 20
24 24 22 25 29
38 38 35 38 43
14 14 14 16 18 20
55 55 55 56 53
32 32 35 35 38 41 41
14 14 15 15 16 20
18 18 18 19 20 27
42 42 45 49 52 54 56
19 19 23 26 27 24
71 71 73 76 80 83 85 85
35 35 38 42 46
25 25 29 32 37
28 28 30 35 37 38 40 41
33 33 38 39 38
69 69 72 79 79
8 8 13 14 15 18 22
40 40 42 47 53
83 87 89 90 91
18 22 25 27 28 30 32 31
47 51 54 57 60 60
66 70 72 74 78
24 28 31 33 40
30 34 33 34 36
65 69 67 70 72 74 73
72 76 77 80 83 80 80
54 58 61 58 62
59 63 65 66 65 66 72
28 32 32 34 35 38 41
16 20 21 23 23 22
48 52 52 55 58 58
17 21 21 24 25 29
19 23 24 25 25 28 33
39 43 44 47 51 53 54
4 8 10 14 16 17 18 17
7 11 12 15 19 22 22
70 74 77 78 80 84 88
60 64 67 70 74 76 81
47 51 58 59 60 62 64
9 13 14 16 22 19
21 25 32 33 35 35
78 82 89 91 95
15 19 26 29 36
53 58 59 61 64 66
52 59 60 62 63 64 66 65
60 67 70 71 71
67 72 75 76 79 81 85
19 25 26 28 30 37
13 19 21 18 20
10 16 19 22 24 26 23 21
37 42 41 44 46 46
53 60 63 64 62 64 68
48 54 55 53 59
49 54 57 57 60 63 65
27 34 35 35 38 41 38
37 42 45 48 49 51 51 51
68 75 78 78 80 84
36 41 43 43 49
36 42 45 46 50 52
24 31 35 36 35
3 10 13 14 18 21 21
25 32 34 37 41 45
51 57 58 60 64 71
10 17 19 21 23 25 32 34
41 46 48 51 54 60 58
7 12 15 17 23 25 27 27
11 18 19 25 29
56 63 64 67 70 75 80
22 21 18 17 16 14 15
86 83 81 78 77 76 73 73
90 88 85 82 81 78 75 71
88 86 85 82 79 76 70
90 88 87 88 86
35 34 33 32 29 26 27 30
95 94 93 90 92 91 91
32 29 28 25 28 26 23 19
62 61 59 58 61 59 56 51
32 29 29 28 26
47 46 45 44 44 46
84 82 79 77 74 74 74
16 14 13 11 10 10 9 5
73 71 68 68 62
42 39 35 32 29 26 24
98 95 94 92 91 87 86 89
83 82 78 77 76 74 74
83 80 76 73 69
25 23 19 18 15 12 6
69 68 66 60 58
15 14 8 5 2 4
55 52 50 48 46 39 37 37
42 41 40 39 37 31 27
90 88 86 84 78 72
37 39 36 33 31 29
65 67 64 62 64
57 59 56 54 51 51
49 52 51 49 46 45 43 39
47 49 46 45 42 36
55 58 56 54 55 53 52 51
29 32 29 30 29 31
95 98 97 96 97 97
36 39 36 39 37 33
79 81 79 77 80 73
55 57 56 56 54 52 51
27 30 28 25 25 22 19 21
61 64 62 62 61 61
51 53 50 48 46 46 45 41
28 31 30 30 27 25 20
27 29 25 22 19
52 54 53 49 51
31 33 31 29 28 24 21 21
29 30 26 23 21 20 16
59 61 59 55 53 48
17 18 17 14 12 9 4 3
67 70 68 63 65
42 45 43 42 36 36
34 36 35 29 27 25 21
62 64 63 62 56 53 51 46
62 62 59 56 55
93 93 90 87 86 85 83 85
74 74 71 68 67 66 66
31 31 28 25 22 18
40 40 39 36 34 32 25
16 16 14 17 16 15 13 11
18 18 15 12 13 12 14
77 77 75 77 76 76
53 53 54 51 48 44
81 81 84 82 79 76 74 67
74 74 71 71 68 66 65 64
4 4 4 1 2
24 24 21 21 20 20
69 69 66 64 64 63 62 58
64 64 61 61 59 57 52
28 28 25 23 19 16 13 10
22 22 20 16 14 13 15
68 68 64 63 62 62
64 64 62 58 55 52 49 45
42 42 38 37 36 31
51 51 50 49 46 40 38
77 77 71 69 68 67 65 68
25 25 24 19 17 16 15 15
99 99 98 93 90 86
82 82 76 74 72 65
91 87 86 83 81 80 79 78
55 51 50 47 44 42 40 42
56 52 51 48 46 43 41 41
72 68 66 63 62 59 55
56 52 51 50 48 47 44 37
27 23 21 23 22
10 6 4 6 7
66 62 65 62 59 57 57
76 72 69 71 69 65
45 41 42 41 39 32
28 24 24 21 20 18
27 23 22 21 21 20 17 18
41 37 35 32 32 31 31
89 85 82 79 79 76 75 71
19 15 12 9 7 7 2
54 50 47 43 42 41
32 28 24 22 23
51 47 43 42 41 40 37 37
41 37 36 32 31 27
97 93 89 87 85 82 81 76
66 62 59 58 52 49
65 61 60 57 51 53
99 95 88 87 87
88 84 82 81 75 74 71 67
76 72 66 63 62 60 55
46 41 38 36 33 31 28
82 75 72 69 71
58 53 52 49 49
53 46 45 42 38
68 62 61 58 57 55 50
66 60 58 56 57 56 54
57 51 48 46 43 46 45 46
65 60 58 56 57 55 55
73 68 69 67 63
29 24 23 24 18
34 28 26 24 21 19 19 17
51 46 45 45 46
15 8 5 3 2 2 2
56 51 50 48 48 47 43
57 51 49 48 48 42
81 76 73 69 68
92 86 83 82 78 81
56 51 49 45 42 40 40
91 84 80 77 76 72
44 39 37 33 30 25
64 57 55 54 51 44 41 38
32 27 24 18 17 16 14 17
64 58 51 49 48 45 45
72 66 64 59 57 53
83 78 72 70 68 67 60
47 48 50 52 55 52
64 67 70 71 72 72
76 77 80 83 84 87 90 94
77 79 82 85 86 87 88 93
44 47 46 47 49
15 17 20 18 20 18
22 24 27 28 30 29 29
20 22 24 21 25
84 85 88 87 90 96
18 19 20 22 24 24 27 29
23 24 24 26 27 29 28
24 25 25 28 28
50 53 53 55 56 60
27 28 29 30 30 32 39
48 49 52 53 54 58 60 63
16 17 20 24 27 24
5 7 8 10 12 16 16
80 81 84 85 86 87 91 95
10 11 14 18 24
48 51 53 58 59 62 64 66
23 24 25 28 33 30
30 33 34 35 41 42 43 43
8 10 11 13 14 20 24
28 30 31 36 39 42 48
61 59 61 62 65 67 69
73 70 72 73 71
90 88 89 91 93 93
15 14 17 19 20 22 24 28
46 45 47 50 52 53 58
70 67 69 66 69
66 65 67 65 68 69 70 68
8 7 5 6 9 11 11
5 3 1 2 4 8
93 92 90 92 93 99
14 12 12 14 16
16 13 13 14 16 15
23 22 22 24 27 28 29 29
34 33 33 34 37 41
11 9 11 11 12 13 15 20
28 25 27 31 32 34
63 62 66 68 70 67
35 34 37 38 42 42
10 8 12 13 16 19 23
42 39 43 44 46 52
84 81 83 90 93
56 55 61 64 61
63 60 62 63 68 70 71 71
83 80 82 83 88 92
71 69 75 77 84
69 69 70 72 73 76
38 38 39 40 41 43 40
6 6 8 10 11 13 13
46 46 49 52 55 56 60
24 24 25 27 29 31 32 37
23 23 24 27 28 29 26 27
82 82 83 86 83 84 82
48 48 51 54 55 52 52
88 88 90 89 91 94 98
11 11 14 17 15 16 23
38 38 40 40 43
35 35 38 40 40 38
26 26 27 27 27
1 1 1 3 7
1 1 4 4 7 10 11 18
83 83 87 89 91 93
37 37 40 41 42 46 49 46
9 9 10 14 15 18 18
67 67 69 71 74 77 81 85
62 62 66 67 69 75
20 20 21 23 29 32 33 36
4 4 10 13 15 16 15
44 44 45 52 53 53
80 80 87 88 89 93
13 13 14 16 22 29
25 29 31 32 34 35
86 90 92 94 95 92
28 32 35 37 39 42 44 44
26 30 31 32 35 39
54 58 61 62 63 65 72
72 76 79 81 82 79 81 83
49 53 56 58 60 63 60 57
66 70 72 69 69
84 88 85 86 90
85 89 91 94 95 92 98
8 12 13 13 14 16 19
85 89 92 92 91
74 78 79 81 82 84 84 84
57 61 61 64 66 70
36 40 40 42 44 51
2 6 8 9 12 16 17 18
26 30 31 35 36 35
50 54 58 61 64 64
47 51 52 54 58 59 63
67 71 73 77 83
7 11 18 20 21 23
66 70 73 80 77
50 54 59 61 64 67 67
76 80 81 82 83 88 90 94
68 72 73 80 82 84 91
18 23 26 27 29 30
67 74 77 78 75
18 24 25 27 27
57 64 67 68 69 73
8 13 15 16 18 19 21 27
68 74 72 73 76 78 79 80
17 22 19 22 19
72 79 78 80 80
42 47 44 45 48 52
20 27 28 27 32
44 51 54 54 56 57 60
43 49 52 55 55 56 58 55
63 70 71 71 74 75 77 77
17 22 25 27 30 30 34
18 24 27 27 29 30 32 39
56 61 64 68 71 74
48 55 59 60 61 58
13 19 22 25 29 31 31
35 40 41 42 45 49 53
24 31 34 35 37 41 46
62 69 70 73 78 81 83
47 52 54 59 62 65 68 67
16 23 24 27 29 36 38 38
57 62 63 65 72 73 75 79
68 73 74 79 82 87
23 21 18 15 12 11 12
86 85 82 79 77 77
24 23 20 19 17 13
89 87 86 84 81 78 72
10 9 7 4 2 5 4 3
74 73 71 72 75
92 90 88 86 83 86 83 83
83 81 80 82 78
33 32 31 33 32 27
21 20 18 15 15 12 10 7
21 20 17 15 14 12 12 14
51 48 46 43 43 40 39 39
46 43 43 41 40 36
71 68 67 64 63 63 56
37 35 32 28 27 26 23
42 41 37 36 34 33 30 32
44 41 40 38 34 34
25 24 22 18 17 14 10
81 79 77 76 72 69 68 62
36 34 29 28 27 24 21
21 20 18 16 9 12
74 72 65 64 62 62
70 67 64 62 56 54 50
89 88 82 80 77 74 73 66
79 81 78 77 75
20 23 20 19 17 19
78 79 78 75 74 72 72
86 88 87 84 83 80 79 75
98 99 98 97 95 93 86
16 18 17 18 16
21 23 21 24 25
28 29 26 25 24 26 26
46 48 45 48 44
27 29 26 23 25 23 17
17 18 17 17 16 15
85 86 83 82 82 79 82
88 91 91 88 88
90 91 91 88 86 84 81 77
43 45 43 43 40 34
18 20 17 15 14 11 7 6
18 19 18 15 13 9 8 10
95 97 93 90 90
89 92 91 90 86 84 83 79
95 96 92 89 87 85 80
29 32 29 23 21
21 22 19 17 11 9 12
87 88 85 83 81 76 76
57 60 54 51 49 45
85 87 81 80 77 76 73 67
30 30 29 26 24 21 20
65 65 64 63 60 59 60
49 49 48 47 46 45 45
56 56 53 52 51 47
82 82 80 77 75 68
47 47 48 45 44
81 81 82 79 82
36 36 39 37 37
49 49 47 45 43 42 45 41
88 88 87 90 85
54 54 52 52 51
89 89 89 87 84 83 86
33 33 31 31 28 25 25
58 58 57 54 54 52 51 47
89 89 86 86 85 78
19 19 17 14 11 7 4 1
68 68 67 63 64
78 78 74 71 70 69 69
56 56 54 50 46
23 23 20 18 14 12 5
50 50 49 48 47 46 40 37
40 40 37 34 28 31
88 88 87 82 80 77 75 75
59 59 56 55 48 44
46 46 43 38 31
83 79 76 75 72 70
67 63 62 59 56 53 52 55
94 90 89 87 87
46 42 41 38 36 33 29
48 44 42 41 39 37 35 29
68 64 65 64 61 59
59 55 53 56 58
66 62 59 61 59 59
35 31 32 31 29 25
90 86 87 85 82 80 77 72
68 64 62 60 60 58 57 55
26 22 21 18 18 17 18
44 40 39 39 39
53 49 46 44 44 40
63 59 58 56 56 54 48
93 89 85 84 81
96 92 89 88 86 82 79 81
22 18 17 13 13
77 73 69 67 63
91 87 84 83 79 76 75 70
98 94 91 85 84 81
14 10 9 3 5
90 86 81 78 75 73 73
31 27 24 22 19 18 13 9
83 79 72 70 64
83 76 75 72 69 66 64 61
48 41 39 38 35 34 37
73 68 66 65 62 60 58 58
94 89 88 86 82
65 58 55 52 50 47 42
43 36 35 34 32 30 33 32
59 54 55 53 50 52
30 23 21 19 22 22
10 5 4 3 6 2
60 53 51 48 46 49 42
14 9 9 7 5
27 21 18 17 16 16 19
94 89 86 83 83 80 80
37 31 31 28 24
52 47 45 42 40 40 35
36 31 30 28 24 22
35 30 28 25 22 20 16 18
84 78 75 71 71
77 71 68 64 60
24 17 16 15 13 9 7 1
31 25 18 15 12
47 42 35 32 31 30 32
38 31 28 26 20 20
96 90 89 86 80 79 78 74
30 24 23 21 16 9
77 77 82 84 87 89 91 89
13 13 12 14 16 20
69 64 63 59 57 54 51 51
82 87 88 90 93 95 95
85 79 76 75 76 74 77
60 64 67 73 79
86 86 85 79 75
74 68 67 61 59
61 57 54 53 53 52 51 44
79 84 81 83 85 90
80 80 76 74 73 70 70
30 31 31 29 26 23 26
35 36 39 42 40
38 38 41 41 44 41
88 91 90 89 87 85 82 78
32 30 28 27 21 21
89 89 86 84 81 84 83 78
40 44 48 49 50 52 55 56
92 89 91 91 88
80 86 89 95 94
49 50 50 47 42
23 28 31 34 40
39 37 35 37 31
25 28 26 23 21 22 19 17
44 38 37 39 37 33
88 90 86 83 78
77 79 83 85 88 95
60 63 61 64 60
70 64 67 64 61 60
38 45 48 51 54 57 59 57
58 56 53 56 52
23 21 23 25 26 27 27
66 60 59 57 56 56 54 57
49 49 49 46 44 39
40 35 33 31 26
65 63 70 73 73
38 31 26 25 20
43 39 36 32 29 23
56 54 52 50 50 47 45 39
58 55 58 59 61 58 59 64
47 45 43 45 45
81 81 78 77 75 71 64
48 42 41 38 39 36 33 33
78 77 83 85 89
14 17 15 14 11 9
62 58 57 51 50 47 43
95 92 95 96 95
62 65 66 70 73 75 75
32 33 33 31 30
94 93 92 87 83
16 16 19 24 27 28 30 32
60 62 60 57 55 56 51
70 73 71 74 73 72 72
9 8 11 18 20 23 22
74 69 67 65 63 57 54 54
14 15 13 11 12 13
26 30 32 30 28
32 32 34 33 33
4 8 10 13 11 14 18
25 25 18 16 14 13 12 12
63 59 58 54 53
40 43 40 39 38 32 26
49 49 51 55 59
23 23 16 14 13 10 7 2
84 80 76 74 71 70 69 65
76 73 71 68 66 65 59
75 70 68 65 61
15 9 6 5 7 1
45 41 38 36 33 28 27
49 55 57 57 63
29 33 36 38 39 45
49 48 49 52 56 63
40 43 46 52 55 56
18 14 11 8 8 6
42 48 49 51 50 52 49
39 45 44 46 48 48
69 73 73 74 74
95 98 95 94 93 89 88 88
13 10 13 17 18 20 21 21
52 49 46 43 37 36 29
5 6 9 11 12 15 19
31 32 35 37 43 46 48 48
47 47 50 52 53 54 55
38 38 39 45 50
47 45 40 39 36
82 85 88 90 88 92
36 36 38 35 32
67 61 61 59 56 53 53
79 84 88 90 92 94 95 93
74 78 79 82 84 88 90 94
14 18 21 19 22 25 26 31
87 83 80 79 78 76 78 73
90 84 81 79 76 74 74 72
56 60 64 66 69 74
3 7 9 12 15 17 20 19
29 32 29 28 26 24 18 16
66 62 60 60 58 56 52
62 66 69 71 74 74
53 53 52 49 48 45 44 47
33 37 38 41 44 45 50 53
40 44 49 52 54 57 57
8 6 13 16 18 20 25
7 3 1 1 4
23 24 21 20 19 22
77 80 78 73 72 74
10 10 7 8 11 13 15
49 49 56 58 61 61
51 47 45 48 47 43
67 67 66 65 66 64 63 64
97 90 89 86 84 84
16 20 23 26 31 35
64 66 65 64 62 60 59 54
17 24 30 32 35
99 93 90 88 84 80
33 37 38 37 38 41
7 12 13 17 20 22 23 23
88 84 81 76 74 69
6 10 13 17 19 18
30 34 36 38 42
77 77 74 72 71 69 66 61
88 88 84 81 78
47 44 42 39 37
13 10 9 6 4 1
37 38 41 44 45 46
66 64 61 59 57 56
38 35 32 29 28 25 24 21
31 32 35 38 41 42 43
50 49 46 44 41 39
37 39 40 41 43 44 47 48
58 55 53 52 49 46 43
70 73 76 79 80 81
43 41 38 36 33 32 29
40 37 35 34 33
22 21 18 15 14 13 12 9
26 25 22 21 18
23 21 20 19 16 15 12
98 96 95 94 91
67 70 72 75 77 79 80 82
92 90 87 84 81
73 70 69 67 65 63 60 59
24 27 28 30 33 36 39 42
18 15 13 11 10 8 7
82 79 77 76 73 71 69 66
2 4 6 8 10
44 42 39 36 33 30
16 13 11 9 7 4
45 46 47 48 50 53
20 19 18 17 16 15 12
34 32 29 28 25
74 76 78 81 82 83 86
17 19 22 24 26 29 31 33
80 83 84 86 88 90 92 94
60 63 65 67 69 70 73 74
55 56 58 59 61
34 35 36 38 39 40 42 45
74 77 80 81 82
40 37 35 32 31 29 27 25
16 15 14 11 10
29 27 24 21 19
48 51 54 56 59 62
42 44 46 49 51 52
95 94 93 91 88
52 54 57 60 63
54 57 60 63 64 66 69
39 42 45 46 49 52
73 72 70 68 66 65 62 59
47 49 52 54 57 58 59
7 9 12 15 16 19 20 21
14 15 18 19 22 24
46 49 51 54 57
50 47 46 44 41 38 35
70 67 66 64 62 59 57
34 33 31 30 28 27 26 23
76 79 82 83 86 89 92
53 51 49 47 46 45
17 19 21 24 25
65 62 59 57 55 52 51 48
88 87 86 83 81 80 79 77
61 59 58 56 53 51
42 45 48 49 51 54 56
58 60 61 62 64
74 71 69 68 65 62 60
21 20 17 14 13 11 8
43 45 46 47 50 53 54
13 16 18 19 22 23 25
19 18 17 15 14 11 9
47 49 51 52 53 54 55 56
93 92 90 89 88 86 83 80
88 89 90 91 93 94 95 98
16 13 11 8 5
41 39 36 34 33 32 29 27
59 58 57 55 52 49
73 76 77 78 81 84 85 87
68 69 71 72 75 77 79
14 12 10 7 6
57 56 55 53 51 50 47
98 96 93 92 89 87
49 48 46 44 42 40
41 43 46 48 50
64 61 58 57 56 53 52
12 10 9 8 6 4
46 48 49 52 55
59 62 65 66 67 70 73
26 29 30 31 33 36
50 47 46 43 41 40 39 38
15 16 19 22 23 26 28
12 13 14 17 20 22 23 26
66 65 63 60 57 54
44 46 48 51 52
7 8 11 12 15 18 20 21
26 28 29 31 32 33
91 90 89 86 84 83 80 78
93 92 91 90 89 87
33 32 31 30 28 27 26
68 69 70 73 76
24 21 18 16 14 11 9 7
5 8 9 11 12
66 65 62 61 60 57 55 53
68 65 63 60 59 58 55
81 79 77 75 74 72
43 42 40 39 37 36
84 82 80 78 77
88 85 83 82 81 79 78 76
21 24 26 28 30 32 33 35
15 16 18 19 21 23 26
18 17 14 11 8 7
52 53 56 59 60 63 65 67
33 34 35 38 39 40
61 62 63 65 66
23 21 19 16 13
3 6 8 10 12
80 77 76 74 72 70 69 66
29 26 23 20 18
59 58 55 54 52 50
51 54 57 59 60 62 63
33 35 36 39 40 43 44
34 32 31 29 27 26
65 64 61 60 57
31 30 27 24 21 19 18 16
18 19 20 21 24
3 6 8 10 13 14
56 55 53 52 50 49
90 88 87 84 82
15 18 19 22 25
96 95 94 91 90 88
14 11 9 7 5 4 1
26 28 31 33 36 37 39
51 49 47 46 44 41
85 83 82 81 78 77 76
43 40 38 36 33
71 70 69 67 65 63 61
40 41 43 45 48 51
55 52 50 49 47 45 42 40
79 78 76 75 73 71
39 38 37 35 32
83 86 88 90 91
70 68 67 64 63 61 58 55
98 95 92 90 89 88 87 85
59 60 62 64 67 70 71 74
99 98 97 95 92 89 87
70 72 75 76 78 79 80
85 88 89 91 93 95
62 60 58 55 53 51 49 47
34 33 32 31 28 25 24 23
87 84 83 82 79
35 34 33 30 29 26
54 57 58 61 64 65
49 50 51 53 55 56
82 80 79 76 74
66 68 70 71 73 76 77 78
44 47 49 50 52 53 55 58
34 35 36 38 40 42
73 76 77 78 80 81
98 95 94 91 90
45 46 48 51 52
21 20 18 16 15 12 10
25 22 19 18 17 14 12 10
56 57 59 60 61 64 66
34 35 38 40 42 44 47
98 97 96 94 93 92 90
44 47 50 52 53 55 57
91 90 89 87 86 83
33 30 27 24 23 21 19
36 38 39 40 43
89 88 85 83 81 80
61 64 67 68 70 71 73
2 4 5 6 8 10
48 50 52 55 57 58
19 17 15 12 9 6 4
55 58 61 63 66 67 69 72
47 50 51 53 56 59
66 64 61 58 57 54 51 50
72 73 75 77 78 81 82
7 9 12 14 15 16 17
30 31 32 35 37 40 42 44
13 14 15 17 19 22
83 84 86 87 89 92 93
19 16 13 10 7 5 3 2
27 29 30 32 34
27 30 33 34 35 38 40
44 46 47 48 50
73 71 70 69 68 66 64 63
52 49 48 47 44
33 32 30 27 24 22 19 17
95 94 91 89 88 87
34 35 37 39 41 43 45
20 19 17 16 13
30 28 27 25 24 21 19
11 14 15 17 20 23
58 56 54 52 50
30 33 34 35 38
32 30 27 25 22 20 18 15
37 40 42 45 46
38 35 32 29 26 25
19 17 15 12 10 8 6
7 8 9 11 13
92 90 89 88 86
28 26 25 22 21 19 18
84 82 79 77 74 72 70
86 83 81 79 77 74
86 87 89 90 91 94 97
31 28 25 22 21
32 29 26 23 22 19 17
89 90 92 93 95
57 60 62 63 64
76 73 72 69 66
97 95 93 90 87 84
1 2 5 6 8
19 17 14 13 11
39 38 35 33 30
83 81 79 78 77
43 42 41 38 36 35 33 30
82 80 77 76 73 71 68
90 88 86 85 84 83
21 24 27 29 31 33 35 36
50 53 54 56 58 60 63
58 55 53 50 48 46 45
72 75 76 79 80 83 85
78 77 76 74 73 70 67
83 80 79 78 75 72
59 57 56 54 52 49 47
73 71 69 68 66 65 62
72 69 66 64 62
54 55 56 58 60
88 87 84 83 81 79 76
46 45 44 43 40 38
42 39 38 37 34 33
13 16 18 19 22 25 28 29
43 44 47 49 51
6 8 9 12 14 15 17
67 70 72 74 75 76 79 80
76 75 73 72 71 70
44 46 48 50 53 56
29 31 32 33 36 39 42 43
15 18 19 20 22 23 26 28
95 94 91 89 87 85 82
49 47 45 43 40
51 54 56 57 60 63
68 71 74 75 76
26 28 31 32 35 37 38 39
33 35 36 37 39 41 44
96 95 94 93 92
54 57 58 60 62 65 68 69
10 13 15 18 20 22
57 60 63 64 67 69 71 74
36 37 39 40 43 45
79 81 84 87 90 92
89 88 87 85 82 79 76
64 62 60 59 56
20 17 16 14 13 12
39 40 42 44 46 49 52
97 96 94 91 90 87 84
19 18 15 14 11 10
76 78 80 81 82
41 43 46 49 52 55 57
24 22 19 18 15 14 11
52 51 50 47 44 41 40
20 23 26 27 28 31 33
84 81 78 77 74
47 50 53 55 57 60
51 54 55 58 61 64 65 66
37 40 41 44 46 49 51 52
23 24 25 27 28
79 78 75 74 72
49 50 53 54 57 58 60
49 52 55 58 60 61 63
33 31 30 29 26 25 22 21
17 14 11 9 7 4
79 81 84 87 89 91 94
89 86 83 81 80
90 88 87 85 82 80 77
58 59 60 62 65 66 67
57 56 53 52 49 48 46
12 15 17 20 22 25 26 29
34 37 39 42 45 48 51
14 15 18 21 24
64 63 61 58 56 55 52
78 75 73 72 70 69 68
77 78 81 84 87
26 24 21 20 19 17
37 40 43 44 46
56 59 60 62 64 65
75 78 80 81 83 85 87
82 79 77 76 73 71 70
37 40 43 46 48
65 64 62 59 56
81 80 79 77 76 75 73
68 71 72 73 75 76 79 80
28 25 22 19 17
27 24 21 19 17 16
52 49 47 46 44
57 54 53 50 49
72 71 70 68 67 64
25 26 29 32 34 36 39
85 88 89 90 91 93 95
21 24 25 28 31 34
35 33 30 28 27 26 24
11 9 7 5 2
10 11 14 15 16 17 18
76 79 81 84 85
43 46 47 48 49
26 27 30 31 32 33
13 15 16 19 21 23 24
45 48 50 53 54
94 92 90 87 86 85 84
59 56 53 50 49
28 26 25 22 20 17 16 15
50 49 48 47 44
58 57 56 54 53 51 49
44 46 48 50 53 54 56
63 64 66 68 70 71 72 74
92 91 90 87 86 83
18 16 14 13 12 11
60 63 64 67 68
30 27 26 24 21 18
77 80 82 85 87 88 91
78 75 74 73 70 67 65
10 13 14 16 17 20 21 23
46 44 41 40 39 36
88 87 85 82 81 79 76 73
42 44 46 49 50 53 54 57
55 52 49 46 45 42 41 40
87 84 82 81 78 76 73 71
62 65 67 69 71 74
35 36 39 42 43 45 46
59 58 55 53 51 50
22 19 18 17 15
76 77 80 81 84
48 47 45 44 41 39
69 67 64 63 61 59 57 55
91 90 87 85 84 81
39 36 33 31 30 27 24 21
79 82 83 84 85 86
96 93 92 89 88 86
15 14 12 9 8 6 4
76 74 73 70 69 67
34 32 30 27 25 24
62 65 68 70 72
26 28 29 30 33 36 37 40
61 64 65 66 67 68
19 20 22 24 26 29 30 31
80 83 84 87 89
96 95 92 89 87 86 83 80
96 95 93 90 89 87 85 84
48 50 53 56 57 58 61 62
27 29 32 33 36 38 41 42
78 80 82 83 85 87 90 93
67 64 62 59 58 57 56 55
69 71 73 76 78
57 55 53 51 48 45 42 41
18 19 21 22 25 28 30 31
86 83 81 79 77 76
32 29 28 25 23 22 20 19
58 60 61 62 63
66 65 63 62 60 57 56
48 49 50 53 54 55 58 60
74 71 70 67 64 62 61
65 62 59 56 53 51
66 68 69 71 74 77
67 69 71 73 75 76 77 80
13 15 18 20 21
40 43 44 45 46 47
42 41 39 37 34 32
13 11 10 9 6 4
48 51 54 57 59 62 65
64 62 60 59 58 55
47 44 43 42 41
82 84 86 89 90 92
83 85 86 88 91 93
53 55 57 60 62 64
19 17 16 15 12 9 6
79 77 75 73 71 69 67 65
74 77 78 81 84 86
54 53 50 47 46 43
98 95 94 93 91 88
94 91 89 86 85 83
98 97 96 94 93 91 90 88
85 82 80 79 76
81 83 86 87 90 93 96
74 77 78 80 82
29 27 26 24 22 19
24 26 27 30 33 34 37 39
17 19 20 23 25 28
76 74 71 69 67`;
