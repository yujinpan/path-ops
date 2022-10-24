import {
  normalizeAliasMap,
  normalizePath,
  resolveWithAlias,
  resolveToAlias,
} from './alias';

describe('alias', () => {
  it('should normalizePath', function () {
    expect(normalizePath('src')).toBe('src');
    expect(normalizePath('src/')).toBe('src');
    expect(normalizePath('src/*')).toBe('src');
    expect(normalizePath('src/**/*')).toBe('src');
  });

  it('should normalizeAliasMap', function () {
    expect(normalizeAliasMap({ '@': 'src' })).toEqual({ '@': 'src' });
    expect(normalizeAliasMap({ '@/': 'src/' })).toEqual({ '@': 'src' });
    expect(normalizeAliasMap({ '@/*': 'src/*' })).toEqual({ '@': 'src' });
    expect(normalizeAliasMap({ '@/**/*': 'src/**/*' })).toEqual({ '@': 'src' });
  });

  it('should resolveWithAlias', function () {
    expect(resolveWithAlias('@', { '@': 'src' })).toBe('src');
    expect(resolveWithAlias('@/index', { '@': 'src' })).toBe('src/index');
    expect(resolveWithAlias('@/page/', { '@': 'src' })).toBe('src/page/');
    expect(resolveWithAlias('@/page/index', { '@': 'src' })).toBe(
      'src/page/index',
    );
    expect(resolveWithAlias('@/page/index', { '@': '/usr/src' })).toBe(
      '/usr/src/page/index',
    );
  });

  it('should resolveToAlias', function () {
    expect(
      resolveToAlias('src', {
        '@': 'src',
      }),
    ).toBe('@');
    expect(
      resolveToAlias('src/index', {
        '@': 'src',
      }),
    ).toBe('@/index');
    expect(
      resolveToAlias('src/page/', {
        '@': 'src',
      }),
    ).toBe('@/page/');
    expect(
      resolveToAlias('src/page/index', {
        '@': 'src',
      }),
    ).toBe('@/page/index');
    expect(
      resolveToAlias('/usr/src/page/index', {
        '@': '/usr/src',
      }),
    ).toBe('@/page/index');
  });
});
