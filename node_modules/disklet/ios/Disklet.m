// Formatted using clang-format with default settings.

#import "Disklet.h"
#import <Foundation/Foundation.h>

@implementation Disklet

RCT_EXPORT_MODULE()

- (id)init {
  self = [super init];
  if (self) {
    NSArray *paths = NSSearchPathForDirectoriesInDomains(NSDocumentDirectory,
                                                         NSUserDomainMask, YES);
    basePath = [paths firstObject];
  }
  return self;
}

+ (BOOL)requiresMainQueueSetup {
  return NO;
}

// helpers -------------------------------------------------------------

- (BOOL)writeFile:(NSString *)path data:(NSData *)data error:(NSError **)error {
  NSString *parent = path.stringByDeletingLastPathComponent;
  NSFileManager *fs = [NSFileManager defaultManager];

  if (![fs createDirectoryAtPath:parent
          withIntermediateDirectories:YES
                           attributes:nil
                                error:error])
    return NO;

  if (![data writeToFile:path options:NSDataWritingAtomic error:error])
    return NO;

  return YES;
}

- (NSDictionary<NSString *, NSString *> *)mapFileTypes:
                                              (NSArray<NSString *> *)files
                                              inFolder:(NSString *)basePath
                                            withPrefix:(NSString *)prefix {
  NSFileManager *fs = [NSFileManager defaultManager];
  NSMutableDictionary<NSString *, NSString *> *out =
      [[NSMutableDictionary alloc] init];

  for (NSUInteger i = 0; i < files.count; ++i) {
    NSString *where = [NSString pathWithComponents:@[ basePath, files[i] ]];
    NSString *path = [prefix stringByAppendingString:files[i]];

    BOOL isDirectory = NO;
    BOOL exists = [fs fileExistsAtPath:where isDirectory:&isDirectory];
    if (exists) {
      [out setValue:isDirectory ? @"folder" : @"file" forKey:path];
    }
  }

  return out;
}

// disklet -------------------------------------------------------------

RCT_EXPORT_METHOD(delete
                  : (NSString *)path resolver
                  : (RCTPromiseResolveBlock)resolve rejecter
                  : (RCTPromiseRejectBlock)reject) {
  NSError *error = nil;
  NSString *where = [NSString pathWithComponents:@[ basePath, path ]];
  NSFileManager *fs = [NSFileManager defaultManager];

  BOOL ok = [fs removeItemAtPath:where error:&error];
  ok = ok || (error && [error.domain isEqualToString:NSCocoaErrorDomain] &&
              error.code == NSFileNoSuchFileError);
  return ok ? resolve(nil)
            : reject(@"EIO",
                     [NSString stringWithFormat:@"Cannot delete '%@'", where],
                     error);
}

RCT_EXPORT_METHOD(getData
                  : (NSString *)path resolver
                  : (RCTPromiseResolveBlock)resolve rejecter
                  : (RCTPromiseRejectBlock)reject) {
  NSError *error = nil;
  NSString *where = [NSString pathWithComponents:@[ basePath, path ]];

  NSData *data = [NSData dataWithContentsOfFile:where options:0 error:&error];
  return data ? resolve([data base64EncodedStringWithOptions:0])
              : reject(@"ENOENT",
                       [NSString stringWithFormat:@"Cannot read '%@'", where],
                       nil);
}

RCT_EXPORT_METHOD(getText
                  : (NSString *)path resolver
                  : (RCTPromiseResolveBlock)resolve rejecter
                  : (RCTPromiseRejectBlock)reject) {
  NSError *error = nil;
  NSString *where = [NSString pathWithComponents:@[ basePath, path ]];

  NSString *text = [NSString stringWithContentsOfFile:where
                                             encoding:NSUTF8StringEncoding
                                                error:&error];
  return text ? resolve(text)
              : reject(@"ENOENT",
                       [NSString stringWithFormat:@"Cannot read '%@'", where],
                       error);
}

RCT_EXPORT_METHOD(list
                  : (NSString *)path resolver
                  : (RCTPromiseResolveBlock)resolve rejecter
                  : (RCTPromiseRejectBlock)reject) {
  NSError *error = nil;
  NSString *where = [NSString pathWithComponents:@[ basePath, path ]];
  NSFileManager *fs = [NSFileManager defaultManager];

  BOOL isDirectory = NO;
  BOOL exists = [fs fileExistsAtPath:where isDirectory:&isDirectory];
  if (!exists) {
    resolve(@{});
  } else if (!isDirectory) {
    resolve([NSDictionary dictionaryWithObject:@"file"
                                        forKey:path.lastPathComponent]);
  } else {
    NSString *prefix =
        [path isEqualToString:@""] ? path : [path stringByAppendingString:@"/"];

    NSArray *files = [fs contentsOfDirectoryAtPath:where error:&error];
    return files
               ? resolve([self mapFileTypes:files
                                   inFolder:where
                                 withPrefix:prefix])
               : reject(@"ENOENT",
                        [NSString stringWithFormat:@"Cannot read '%@'", where],
                        error);
  }
}

RCT_EXPORT_METHOD(setData
                  : (NSString *)path data
                  : (NSString *)base64data resolver
                  : (RCTPromiseResolveBlock)resolve rejecter
                  : (RCTPromiseRejectBlock)reject) {
  NSError *error = nil;
  NSString *where = [NSString pathWithComponents:@[ basePath, path ]];

  NSData *data = [[NSData alloc] initWithBase64EncodedString:base64data
                                                     options:0];
  BOOL ok = [self writeFile:where data:data error:&error];
  return ok ? resolve(nil)
            : reject(@"ENOENT",
                     [NSString stringWithFormat:@"Cannot write '%@'", where],
                     error);
}

RCT_EXPORT_METHOD(setText
                  : (NSString *)path text
                  : (NSString *)text resolver
                  : (RCTPromiseResolveBlock)resolve rejecter
                  : (RCTPromiseRejectBlock)reject) {
  NSError *error = nil;
  NSString *where = [NSString pathWithComponents:@[ basePath, path ]];

  NSData *data = [text dataUsingEncoding:NSUTF8StringEncoding];
  BOOL ok = [self writeFile:where data:data error:&error];
  return ok ? resolve(nil)
            : reject(@"ENOENT",
                     [NSString stringWithFormat:@"Cannot write '%@'", where],
                     error);
}

@end
