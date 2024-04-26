// You can also use the generator at https://skeleton.dev/docs/generator to create these values for you

export const docker = {
	name: 'docker',
	properties: {
		// =~= Theme Properties =~=
		"--theme-font-family-base": `Inter, ui-sans-serif, system-ui, -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, 'Helvetica Neue', Arial, 'Noto Sans', sans-serif, 'Apple Color Emoji', 'Segoe UI Emoji', 'Segoe UI Symbol', 'Noto Color Emoji'`,
		"--theme-font-family-heading": `ui-monospace, SFMono-Regular, Menlo, Monaco, Consolas, 'Liberation Mono', 'Courier New', monospace`,
		"--theme-font-color-base": "0 0 0",
		"--theme-font-color-dark": "255 255 255",
		"--theme-rounded-base": "9999px",
		"--theme-rounded-container": "8px",
		"--theme-border-base": "1px",
		// =~= Theme On-X Colors =~=
		"--on-primary": "0 0 0",
		"--on-secondary": "0 0 0",
		"--on-tertiary": "255 255 255",
		"--on-success": "0 0 0",
		"--on-warning": "0 0 0",
		"--on-error": "0 0 0",
		"--on-surface": "0 0 0",
		// =~= Theme Colors  =~=
		// primary | #0db7ed 
		"--color-primary-50": "219 244 252", // #dbf4fc
		"--color-primary-100": "207 241 251", // #cff1fb
		"--color-primary-200": "195 237 251", // #c3edfb
		"--color-primary-300": "158 226 248", // #9ee2f8
		"--color-primary-400": "86 205 242", // #56cdf2
		"--color-primary-500": "13 183 237", // #0db7ed
		"--color-primary-600": "12 165 213", // #0ca5d5
		"--color-primary-700": "10 137 178", // #0a89b2
		"--color-primary-800": "8 110 142", // #086e8e
		"--color-primary-900": "6 90 116", // #065a74
		// secondary | #905809 
		"--color-secondary-50": "238 230 218", // #eee6da
		"--color-secondary-100": "233 222 206", // #e9dece
		"--color-secondary-200": "227 213 194", // #e3d5c2
		"--color-secondary-300": "211 188 157", // #d3bc9d
		"--color-secondary-400": "177 138 83", // #b18a53
		"--color-secondary-500": "144 88 9", // #905809
		"--color-secondary-600": "130 79 8", // #824f08
		"--color-secondary-700": "108 66 7", // #6c4207
		"--color-secondary-800": "86 53 5", // #563505
		"--color-secondary-900": "71 43 4", // #472b04
		// tertiary | #706b85 
		"--color-tertiary-50": "234 233 237", // #eae9ed
		"--color-tertiary-100": "226 225 231", // #e2e1e7
		"--color-tertiary-200": "219 218 225", // #dbdae1
		"--color-tertiary-300": "198 196 206", // #c6c4ce
		"--color-tertiary-400": "155 151 170", // #9b97aa
		"--color-tertiary-500": "112 107 133", // #706b85
		"--color-tertiary-600": "101 96 120", // #656078
		"--color-tertiary-700": "84 80 100", // #545064
		"--color-tertiary-800": "67 64 80", // #434050
		"--color-tertiary-900": "55 52 65", // #373441
		// success | #a6ed92 
		"--color-success-50": "242 252 239", // #f2fcef
		"--color-success-100": "237 251 233", // #edfbe9
		"--color-success-200": "233 251 228", // #e9fbe4
		"--color-success-300": "219 248 211", // #dbf8d3
		"--color-success-400": "193 242 179", // #c1f2b3
		"--color-success-500": "166 237 146", // #a6ed92
		"--color-success-600": "149 213 131", // #95d583
		"--color-success-700": "125 178 110", // #7db26e
		"--color-success-800": "100 142 88", // #648e58
		"--color-success-900": "81 116 72", // #517448
		// warning | #e6ee77 
		"--color-warning-50": "251 252 235", // #fbfceb
		"--color-warning-100": "250 252 228", // #fafce4
		"--color-warning-200": "249 251 221", // #f9fbdd
		"--color-warning-300": "245 248 201", // #f5f8c9
		"--color-warning-400": "238 243 160", // #eef3a0
		"--color-warning-500": "230 238 119", // #e6ee77
		"--color-warning-600": "207 214 107", // #cfd66b
		"--color-warning-700": "173 179 89", // #adb359
		"--color-warning-800": "138 143 71", // #8a8f47
		"--color-warning-900": "113 117 58", // #71753a
		// error | #f09e9e 
		"--color-error-50": "253 240 240", // #fdf0f0
		"--color-error-100": "252 236 236", // #fcecec
		"--color-error-200": "251 231 231", // #fbe7e7
		"--color-error-300": "249 216 216", // #f9d8d8
		"--color-error-400": "245 187 187", // #f5bbbb
		"--color-error-500": "240 158 158", // #f09e9e
		"--color-error-600": "216 142 142", // #d88e8e
		"--color-error-700": "180 119 119", // #b47777
		"--color-error-800": "144 95 95", // #905f5f
		"--color-error-900": "118 77 77", // #764d4d
		// surface | #384d54 
		"--color-surface-50": "225 228 229", // #e1e4e5
		"--color-surface-100": "215 219 221", // #d7dbdd
		"--color-surface-200": "205 211 212", // #cdd3d4
		"--color-surface-300": "175 184 187", // #afb8bb
		"--color-surface-400": "116 130 135", // #748287
		"--color-surface-500": "56 77 84", // #384d54
		"--color-surface-600": "50 69 76", // #32454c
		"--color-surface-700": "42 58 63", // #2a3a3f
		"--color-surface-800": "34 46 50", // #222e32
		"--color-surface-900": "27 38 41", // #1b2629
	}
}