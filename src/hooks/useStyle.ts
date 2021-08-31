import {DependencyList, useMemo} from 'react'
import {ImageStyle, RegisteredStyle, StyleProp, StyleSheet, TextStyle, ViewStyle} from 'react-native'

/**
 * A hook to memoize a style. Uses `ViewStyle` per default, but can be used with other styles deriving from `FlexStyle` as well, such as `TextStyle`.
 * @param styleFactory The function that returns a style
 * @param deps The dependencies to trigger memoization re-evaluation
 * @example
 *
 * const style = useStyle(() => ({ height: someDynamicValue }), [someDynamicValue])
 */
export const useStyle = <TStyle extends ViewStyle | TextStyle | ImageStyle, TOutput extends StyleProp<TStyle>>(
  styleFactory: () => TOutput,
  deps?: DependencyList,
): TOutput =>
  // eslint-disable-next-line react-hooks/exhaustive-deps
  useMemo(styleFactory, deps)

/**
 * A hook to memoize a style and flatten it into a single object. Uses `ViewStyle` per default, but can be used with other styles deriving from `FlexStyle` as well, such as `TextStyle`.
 * @param styleFactory The function that returns a style
 * @param deps The dependencies to trigger memoization re-evaluation
 * @example
 *
 * const style = useStyle(() => ({ height: someDynamicValue }), [someDynamicValue])
 */
export const useFlatStyle = <TStyle extends ViewStyle | TextStyle | ImageStyle, TOutput extends StyleProp<TStyle>>(
  styleFactory: () => TOutput,
  deps?: DependencyList,
): TStyle extends (infer U)[] ? U : TStyle =>
  // eslint-disable-next-line react-hooks/exhaustive-deps
  useMemo(() => StyleSheet.flatten(styleFactory()), deps)

const isRegisteredStyle = <T>(style: T | unknown): style is RegisteredStyle<T> => {
  if (typeof style === 'object' && style != null) return '__registeredStyleBrand' in style
  else return false
}

/**
 * Find a specific value in the given style
 * @param style The style to search the given key in
 * @param stylePropertyKey The style property to search for
 * @returns The value of the found style property, or `undefined` if not found
 */
export const findStyle = <
  TStyle extends ViewStyle | TextStyle | ImageStyle,
  TResult extends TStyle extends (infer U)[] ? U : TStyle,
  TName extends keyof TResult
>(
  style: StyleProp<TStyle>,
  stylePropertyKey: TName,
): TResult[TName] | undefined => {
  if (Array.isArray(style)) {
    // we're doing a reverse loop because values in elements at the end override values at the beginning
    for (let i = style.length - 1; i >= 0; i--) {
      const result = findStyle<TStyle, TResult, TName>(
        // @ts-expect-error it's complaining because it is `readonly`, but we're not modifying it anyways. StyleProp<T>::RecursiveArray<T> needs to be readonly.
        style[i],
        stylePropertyKey,
      )
      if (result != null) return result
    }
  } else {
    if (style == null) {
      // null, undefined
      return undefined
    } else if (typeof style === 'boolean') {
      // false
      return undefined
    } else if (isRegisteredStyle(style)) {
      // RegisteredStyle<T> (number) - does not actually exist.
      // @ts-expect-error typings for StyleProp<> are really hard
      return style.__registeredStyleBrand[stylePropertyKey]
    } else {
      // @ts-expect-error typings for StyleProp<> are really hard
      return style[stylePropertyKey]
    }
  }
}
