import { afterEach, beforeEach, describe, expect, it, vi } from 'vitest';
import { DropdownValueFlag, dropdownOptionStore } from './dropdownOptionStore.js';

const get = (store) => {
	let out = [];
	store.subscribe((v) => (out = v))();
	return out;
};

describe('dropdownOptionStore', () => {
	beforeEach(() => {
		vi.useFakeTimers();
	});
	afterEach(() => {
		vi.useRealTimers();
	});

	it('should add options and apply defaults', () => {
		const { addOption, options } = dropdownOptionStore();

		addOption({
			value: 1,
			label: 'test'
		});
		addOption({
			value: 2,
			label: 'test'
		});

		expect(get(options)).toHaveLength(0);
		vi.advanceTimersByTime(100);

		const $options = get(options);

		expect($options).toHaveLength(2);
		expect($options[0]).toEqual({ value: 1, label: 'test', idx: -1, removeOnDeselect: false });
		expect($options[1]).toEqual({ value: 2, label: 'test', idx: -1, removeOnDeselect: false });
	});

	it('should remove options', () => {
		const { addOption, removeOption, options } = dropdownOptionStore();

		addOption({
			value: 1,
			label: 'test'
		});
		removeOption({
			value: 1,
			label: 'test'
		});

		expect(get(options)).toHaveLength(0);
		vi.advanceTimersByTime(100);

		const $options = get(options);

		expect($options).toHaveLength(0);
	});

	describe('hygeine', () => {
		it('should deduplicate options by value + label', () => {
			const { addOption, options } = dropdownOptionStore();
			addOption({
				value: 1,
				label: 'test'
			});
			addOption({
				value: 1,
				label: 'test'
			});

			vi.advanceTimersByTime(100);
			expect(get(options)).toHaveLength(1);
		});

		it('should sort options by idx and value', () => {
			const { addOption, options } = dropdownOptionStore();
			addOption({
				value: 1,
				label: 'A',
				idx: 1
			});
			addOption({
				value: 0,
				label: 'B',
				idx: 0
			});
			addOption({
				value: 2,
				label: 'C',
				idx: 1
			});
			vi.advanceTimersByTime(100);

			expect(get(options)[0].label).toBe('B'); // B has index 0
			expect(get(options)[1].label).toBe('A'); // A has index 1, but value is lower than C
			expect(get(options)[2].label).toBe('C');
		});

		it('should keep options sorted by idx and value', async () => {
			const { addOption, removeOption, options } = dropdownOptionStore();
			addOption({
				value: 1,
				label: 'A',
				idx: 1
			});
			addOption({
				value: 2,
				label: 'C',
				idx: 1
			});

			await vi.advanceTimersByTimeAsync(100);
			expect(get(options)[0].label).toBe('A');
			expect(get(options)[1].label).toBe('C');
			addOption({
				value: 0,
				label: 'B',
				idx: 0
			});

			await vi.advanceTimersByTimeAsync(100);
			expect(get(options)[0].label).toBe('B');
			expect(get(options)[1].label).toBe('A');
			expect(get(options)[2].label).toBe('C');

			removeOption({
				label: 'A',
				value: 1
			});
			await vi.advanceTimersByTimeAsync(100);
			expect(get(options)[0].label).toBe('B');
			expect(get(options)[1].label).toBe('C');
		});
	});

	describe('flags', () => {
		it('should apply flags to options', () => {
			const { addOption, options, flagOption } = dropdownOptionStore();

			const opt = { value: 1, label: 'test' };

			addOption(opt);
			flagOption([opt, DropdownValueFlag.REMOVE_ON_DESELECT]);

			vi.advanceTimersByTime(100);
			expect(get(options)[0].removeOnDeselect).toBe(true);
		});
		it('should toggle flags to options', () => {
			const { addOption, options, flagOption } = dropdownOptionStore();

			const opt = { value: 1, label: 'test' };

			addOption(opt);
			flagOption([opt, DropdownValueFlag.REMOVE_ON_DESELECT]);
			flagOption([opt, DropdownValueFlag.REMOVE_ON_DESELECT]);

			vi.advanceTimersByTime(100);
			expect(get(options)[0].removeOnDeselect).toBe(false);
		});
		describe('removeOnDeselect', () => {
			it('should not remove removeOnDeselects', () => {
				const { addOption, removeOption, options, flagOption, select } = dropdownOptionStore();

				const opt = { value: 1, label: 'test' };
				const opt2 = { value: 2, label: 'test' };

				addOption(opt);
				addOption(opt2);
				flagOption([opt, DropdownValueFlag.REMOVE_ON_DESELECT]);
				select(opt);
				removeOption(opt);
				removeOption(opt2);

				vi.advanceTimersByTime(100);
				expect(get(options)[0]).toEqual({
					...opt,
					removeOnDeselect: true,
					selected: true,
					idx: -1
				});
				expect(get(options)).toHaveLength(1);
			});
			it('should float removeOnDeselects to the top', async () => {
				const { addOption, removeOption, options, flagOption, select } = dropdownOptionStore();
				const opt = { value: 1, label: 'test', idx: 4 };
				const opt2 = { value: 2, label: 'test', idx: 2 };

				addOption(opt);
				addOption(opt2);

				flagOption([opt, DropdownValueFlag.REMOVE_ON_DESELECT]);
				select(opt);

				removeOption(opt);

				await vi.advanceTimersByTimeAsync(100);
				expect(get(options)[0]).toEqual({ ...opt, removeOnDeselect: true, selected: true });
				expect(get(options)[1]).toEqual({ ...opt2, removeOnDeselect: false, selected: false });
			});
			it('should float removeOnDeselects to the top, but below manual options', async () => {
				const { addOption, removeOption, options, flagOption, select } = dropdownOptionStore();
				const opt = { value: 1, label: 'test', idx: 4, __auto: true };
				const opt2 = { value: 2, label: 'test', idx: 2, __auto: true };
				const opt3 = { value: 3, label: 'test', idx: -1, __auto: false };

				addOption(opt);
				addOption(opt2);
				addOption(opt3);

				flagOption([opt, DropdownValueFlag.REMOVE_ON_DESELECT]);
				select(opt);

				removeOption(opt);

				await vi.advanceTimersByTimeAsync(100);
				expect(get(options)[0]).toEqual({ ...opt3, removeOnDeselect: false, selected: false });
				expect(get(options)[1]).toEqual({ ...opt, removeOnDeselect: true, selected: true });
				expect(get(options)[2]).toEqual({ ...opt2, removeOnDeselect: false, selected: false });
			});
		});
	});

	describe('single select', () => {
		it('should allow you to select an option', () => {
			const { addOption, select, selectedOptions } = dropdownOptionStore();
			const opt = { value: 1, label: 'test' };
			const opt2 = { value: 2, label: 'test' };

			addOption(opt);
			addOption(opt2);

			select(opt);
			vi.advanceTimersByTime(100);
			expect(get(selectedOptions).map((v) => ({ label: v.label, value: v.value }))).toEqual([opt]);
		});
	});
	describe('multi select', () => {
		it('should allow you to select multiple options', () => {
			const { addOption, select, selectedOptions } = dropdownOptionStore(true);
			const opt = { value: 1, label: 'test' };
			const opt2 = { value: 2, label: 'test' };
			addOption(opt);
			addOption(opt2);
			select(opt);
			select(opt2);
			vi.advanceTimersByTime(100);
			expect(get(selectedOptions).map((v) => ({ label: v.label, value: v.value }))).toEqual([
				opt,
				opt2
			]);
		});
		it('should allow you to unselect options', () => {
			const { addOption, select, selectedOptions } = dropdownOptionStore(true);
			const opt = { value: 1, label: 'test' };
			const opt2 = { value: 2, label: 'test' };
			addOption(opt);
			addOption(opt2);
			select(opt);
			select(opt2);
			select(opt);
			vi.advanceTimersByTime(100);
			expect(get(selectedOptions).map((v) => ({ label: v.label, value: v.value }))).toEqual([opt2]);
		});
	});
});
