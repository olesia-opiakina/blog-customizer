import { ArrowButton } from 'src/ui/arrow-button';
import { Button } from 'src/ui/button';
import clsx from 'clsx';
import { Text } from 'src/ui/text';
import { Select } from 'src/ui/select';
import { RadioGroup } from 'src/ui/radio-group';
import { Separator } from 'src/ui/separator';
import styles from './ArticleParamsForm.module.scss';
import { useState, useEffect, useRef } from 'react';
import {
	defaultArticleState,
	fontFamilyOptions,
	fontSizeOptions,
	fontColors,
	backgroundColors,
	contentWidthArr,
	OptionType,
	ArticleStateType,
} from 'src/constants/articleProps';

type FormProps = {
	isOpen: boolean;
	onClick: () => void;
	onApply: (settings: ArticleStateType) => void;
	onClear: () => void;
};

export const ArticleParamsForm = (props: FormProps) => {
	const [fontFamilyOption, setFontFamilyOption] = useState<OptionType>(
		defaultArticleState.fontFamilyOption
	);
	const [fontSizeOption, setFontSizeOption] = useState<OptionType>(
		defaultArticleState.fontSizeOption
	);
	const [fontColor, setFontColor] = useState<OptionType>(
		defaultArticleState.fontColor
	);
	const [backgroundColor, setBackgroundColor] = useState<OptionType>(
		defaultArticleState.backgroundColor
	);
	const [contentWidth, setContentWidth] = useState<OptionType>(
		defaultArticleState.contentWidth
	);
	const currentSettings: ArticleStateType = {
		fontFamilyOption,
		fontSizeOption,
		fontColor,
		backgroundColor,
		contentWidth,
	};
	const formContainerRef = useRef<HTMLElement | null>(null);

	useEffect(() => {
		function handleClickOutside(event: MouseEvent) {
			if (
				props.isOpen &&
				formContainerRef.current &&
				!formContainerRef.current.contains(event.target as Node)
			) {
				props.onClick();
			}
		}

		document.addEventListener('mousedown', handleClickOutside);

		return () => {
			document.removeEventListener('mousedown', handleClickOutside);
		};
	}, [props.isOpen, props.onClick]);

	function handleFontChange(selected: OptionType) {
		setFontFamilyOption(selected);
	}
	function handleFontSizeOptionChange(selected: OptionType) {
		setFontSizeOption(selected);
	}
	function handleFontColorChange(selected: OptionType) {
		setFontColor(selected);
	}
	function handleBackgroundColorChange(selected: OptionType) {
		setBackgroundColor(selected);
	}
	function handleContentWidthChange(selected: OptionType) {
		setContentWidth(selected);
	}

	function handleSubmit(event: React.FormEvent<HTMLFormElement>) {
		event.preventDefault();
		props.onApply(currentSettings);
	}

	function handleReset(event: React.FormEvent<HTMLFormElement>) {
		event.preventDefault();
		setFontFamilyOption(defaultArticleState.fontFamilyOption);
		setFontSizeOption(defaultArticleState.fontSizeOption);
		setFontColor(defaultArticleState.fontColor);
		setBackgroundColor(defaultArticleState.backgroundColor);
		setContentWidth(defaultArticleState.contentWidth);
		props.onClear();
	}

	return (
		<>
			<ArrowButton isOpen={props.isOpen} onClick={props.onClick} />
			<aside
				ref={formContainerRef}
				className={clsx(
					styles.container,
					props.isOpen ? styles.container_open : ''
				)}>
				<form
					className={styles.form}
					onSubmit={handleSubmit}
					onReset={handleReset}>
					<Text as='h2' size={31} weight={800} uppercase align='left'>
						Задайте параметры
					</Text>
					<Select
						selected={fontFamilyOption}
						onChange={handleFontChange}
						options={fontFamilyOptions}
						title='Шрифт'></Select>
					<RadioGroup
						title='Размер шрифта'
						selected={fontSizeOption}
						name='font-size'
						options={fontSizeOptions}
						onChange={handleFontSizeOptionChange}></RadioGroup>
					<Select
						selected={fontColor}
						onChange={handleFontColorChange}
						options={fontColors}
						title='Цвет шрифта'></Select>
					<Separator></Separator>
					<Select
						selected={backgroundColor}
						onChange={handleBackgroundColorChange}
						options={backgroundColors}
						title='Цвет фона'></Select>
					<Select
						selected={contentWidth}
						onChange={handleContentWidthChange}
						options={contentWidthArr}
						title='Ширина контента'></Select>
					<div className={styles.bottomContainer}>
						<Button title='Сбросить' htmlType='reset' type='clear' />
						<Button title='Применить' htmlType='submit' type='apply' />
					</div>
				</form>
			</aside>
		</>
	);
};
