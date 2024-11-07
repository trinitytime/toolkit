export interface ChildProcessInfo {
  pid: number
  status: 'running' | 'failed' | 'exited'
  error?: string
}

export interface SpawnOptions {
  cwd?: string
  env?: NodeJS.ProcessEnv
}

// 자식 프로세스 실행 함수
export async function runNodeDetachSpawn(args: string[], opts: SpawnOptions = {}): Promise<ChildProcessInfo> {
  try {
    const { spawn } = await import('node:child_process')
    const [command, ...restArgs] = args

    // 자식 프로세스 설정
    const child = spawn(command, restArgs, {
      // 프로세스 분리 설정
      detached: true,
      // 부모 프로세스의 stdio를 상속하지 않음
      stdio: ['ignore', 'ignore', 'ignore'],
      // 작업 디렉토리 설정
      cwd: process.cwd(),
      // 환경 변수 설정
      env: process.env,
      // 사용자 정의 설정
      ...opts,
    })

    // 초기 상태 확인을 위한 Promise 반환
    return new Promise((resolve) => {
      // 프로세스 시작 직후 에러 발생 시
      child.on('error', (err) => {
        resolve({
          pid: child.pid ?? -1,
          status: 'failed',
          error: `Failed to start child process: ${err.message}`,
        })
      })

      // 프로세스가 즉시 종료되는 경우
      child.on('exit', (code, signal) => {
        if (code === 0) {
          resolve({
            pid: child.pid ?? -1,
            status: 'exited',
          })
        } else {
          resolve({
            pid: child.pid ?? -1,
            status: 'failed',
            error: `Child process exited immediately with code ${code} and signal ${signal}`,
          })
        }
      })

      // 일정 시간 후에도 프로세스가 살아있다면 성공으로 간주
      setTimeout(() => {
        if (child.killed) {
          resolve({
            pid: child.pid ?? -1,
            status: 'failed',
            error: 'Child process was killed',
          })
        } else {
          // 부모로부터 참조 해제
          child.unref()
          resolve({
            pid: child.pid ?? -1,
            status: 'running',
          })
        }
      }, 1000)
    })
  } catch (error) {
    return Promise.resolve({
      pid: -1,
      status: 'failed',
      error: `Unexpected error: ${error}`,
    })
  }
}

// 자식 프로세스 실행 함수
export function runBunDetachSpawn(args: string[], opts: SpawnOptions = {}): Promise<ChildProcessInfo> {
  try {
    const Bun = globalThis.Bun
    // 자식 프로세스 설정
    const proc = Bun.spawn(args, {
      // 프로세스 분리 설정
      detached: true,
      // 부모 프로세스의 stdio를 상속하지 않음
      stdio: ['ignore', 'ignore', 'ignore'],
      // 작업 디렉토리 설정
      cwd: process.cwd(),
      // 환경 변수 설정
      env: process.env,
      // 사용자 정의 설정
      ...opts,
    })

    // 프로세스 상태 확인을 위한 Promise
    return new Promise((resolve) => {
      if (!proc.pid) {
        resolve({
          pid: -1,
          status: 'failed',
          error: 'Failed to get process ID',
        })
        return
      }

      // 프로세스 시작 직후 상태 확인
      setTimeout(async () => {
        try {
          // exitCode가 null이면 아직 실행 중
          const exitCode = proc.exitCode

          if (exitCode === null) {
            proc.unref()
            resolve({
              pid: proc.pid,
              status: 'running',
            })
          } else if (exitCode === 0) {
            resolve({
              pid: proc.pid,
              status: 'exited',
            })
          } else {
            resolve({
              pid: proc.pid,
              status: 'failed',
              error: `Process exited immediately with code ${exitCode}`,
            })
          }
        } catch (error) {
          resolve({
            pid: proc.pid,
            status: 'failed',
            error: `Error checking process status: ${error}`,
          })
        }
      }, 1000)
    })
  } catch (error) {
    return Promise.resolve({
      pid: -1,
      status: 'failed',
      error: `Unexpected error: ${error}`,
    })
  }
}

export async function runDetachSpawn(args: string[], options: SpawnOptions = {}): Promise<ChildProcessInfo> {
  if (typeof globalThis.Bun !== 'undefined') {
    // Bun이 정의되어 있는 경우
    return runBunDetachSpawn(args, options)
  }

  return runNodeDetachSpawn(args, options)
}
