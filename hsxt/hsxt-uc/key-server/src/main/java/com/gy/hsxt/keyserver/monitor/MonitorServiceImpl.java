package com.gy.hsxt.keyserver.monitor;

import java.io.*;
import java.util.StringTokenizer;

//import com.gy.common.log.GyLogger;
import com.gy.hsxt.keyserver.beans.MonitorInfoBean;
/*import com.sun.management.OSMBeanFactory; 
import com.sun.management.OperatingSystemMXBean;*/

public class MonitorServiceImpl implements IMonitorService {
//	private static final GyLogger LOGGER = GyLogger.getLogger(MonitorServiceImpl.class);
    private static final int CPUTIME = 30; 

    private static final int PERCENT = 100; 

    private static final int FAULTLENGTH = 10; 
   
//    private static final File versionFile = new File("/proc/version"); 
    private static String linuxVersion = "2.6"; 

    /** 
     * 获得当前的监控对象. 
     * @return 返回构造好的监控对象 
     * @throws Exception 
     * @author GuoHuang 
     */ 
    public MonitorInfoBean getMonitorInfoBean() { 
        int kb = 1024; 
       
        // 可使用内存 
        long totalMemory = Runtime.getRuntime().totalMemory() / kb; 
        // 剩余内存 
        long freeMemory = Runtime.getRuntime().freeMemory() / kb; 
        // 最大可使用内存 
        long maxMemory = Runtime.getRuntime().maxMemory() / kb; 
        // 操作系统 
        String osName = System.getProperty("os.name"); 

/*        OperatingSystemMXBean osmxb = (OperatingSystemMXBean) OSMBeanFactory 
                .getOperatingSystemMXBean(); 

        // 总的物理内存 
        long totalMemorySize = osmxb.getTotalPhysicalMemorySize() / kb; 
        // 剩余的物理内存 
        long freePhysicalMemorySize = osmxb.getFreePhysicalMemorySize() / kb; 
        // 已使用的物理内存 
        long usedMemory = (osmxb.getTotalPhysicalMemorySize() - osmxb 
                .getFreePhysicalMemorySize()) 
                / kb; 
*/
        // 获得线程总数 
        ThreadGroup parentThread; 
        for (parentThread = Thread.currentThread().getThreadGroup(); parentThread 
                .getParent() != null; parentThread = parentThread.getParent()) 
            ; 
        int totalThread = parentThread.activeCount(); 

        double cpuRatio = 0; 
        if (osName.toLowerCase().startsWith("windows")) { 
            cpuRatio = this.getCpuRatioForWindows(); 
        } 
        else { 
         cpuRatio = this.getCpuRateForLinux(); 
        } 
       
        // 构造返回对象 
        MonitorInfoBean infoBean = new MonitorInfoBean(); 
        infoBean.setFreeMemory(freeMemory); 
//        infoBean.setFreePhysicalMemorySize(freePhysicalMemorySize); 
        infoBean.setMaxMemory(maxMemory); 
        infoBean.setOsName(osName); 
        infoBean.setTotalMemory(totalMemory); 
//        infoBean.setTotalMemorySize(totalMemorySize); 
        infoBean.setTotalThread(totalThread); 
//        infoBean.setUsedMemory(usedMemory); 
        infoBean.setCpuRatio(cpuRatio); 
        return infoBean; 
    } 
    private double getCpuRateForLinux(){ 
        InputStream is = null; 
        InputStreamReader isr = null; 
        BufferedReader brStat = null; 
        StringTokenizer tokenStat = null; 
        try{ 
//        	LOGGER.debug("Get usage rate of CUP , linux version: "+linuxVersion); 

            Process process = Runtime.getRuntime().exec("top -b -n 1"); 
            is = process.getInputStream();                   
            isr = new InputStreamReader(is); 
            brStat = new BufferedReader(isr); 
           
            if(linuxVersion.equals("2.4")){ 
                brStat.readLine(); 
                brStat.readLine(); 
                brStat.readLine(); 
                brStat.readLine(); 
               
                tokenStat = new StringTokenizer(brStat.readLine()); 
                tokenStat.nextToken(); 
                tokenStat.nextToken(); 
                String user = tokenStat.nextToken(); 
                tokenStat.nextToken(); 
                String system = tokenStat.nextToken(); 
                tokenStat.nextToken(); 
                String nice = tokenStat.nextToken(); 
               
                System.out.println(user+" , "+system+" , "+nice); 
               
                user = user.substring(0,user.indexOf("%")); 
                system = system.substring(0,system.indexOf("%")); 
                nice = nice.substring(0,nice.indexOf("%")); 
               
                float userUsage = new Float(user).floatValue(); 
                float systemUsage = new Float(system).floatValue(); 
                float niceUsage = new Float(nice).floatValue(); 
               
                return (userUsage+systemUsage+niceUsage)/100; 
            }else{ 
                brStat.readLine(); 
                brStat.readLine(); 
                   
                tokenStat = new StringTokenizer(brStat.readLine()); 
                tokenStat.nextToken(); 
                tokenStat.nextToken(); 
                tokenStat.nextToken(); 
                tokenStat.nextToken(); 
                tokenStat.nextToken(); 
                tokenStat.nextToken(); 
                tokenStat.nextToken(); 
                String cpuUsage = tokenStat.nextToken(); 
                   
               
                System.out.println("cpuUsage : "+cpuUsage); 
                Float usage = new Float(cpuUsage.substring(0,cpuUsage.indexOf("%"))); 
               
                return (1-usage.floatValue()/100); 
            } 

            
        } catch(IOException ioe){ 
//        	LOGGER.debug(ioe.getMessage()); 
        } finally{ 
            freeResource(is, isr, brStat); 
        }
        return 1;

    } 
    private static void freeResource(InputStream is, InputStreamReader isr, BufferedReader br){ 
        try{ 
            if(is!=null) 
                is.close(); 
            if(isr!=null) 
                isr.close(); 
            if(br!=null) 
                br.close(); 
        }catch(IOException ioe){ 
//        	LOGGER.debug(ioe.getMessage()); 
        } 
    } 


    /** 
     * 获得CPU使用率. 
     * @return 返回cpu使用率 
     * @author GuoHuang 
     */ 
    private double getCpuRatioForWindows() { 
        try { 
            String procCmd = System.getenv("windir") 
                    + "\\system32\\wbem\\wmic.exe process get Caption,CommandLine," 
                    + "KernelModeTime,ReadOperationCount,ThreadCount,UserModeTime,WriteOperationCount"; 
            // 取进程信息 
            long[] c0 = readCpu(Runtime.getRuntime().exec(procCmd)); 
            Thread.sleep(CPUTIME); 
            long[] c1 = readCpu(Runtime.getRuntime().exec(procCmd)); 
            if (c0 != null && c1 != null) { 
                long idletime = c1[0] - c0[0]; 
                long busytime = c1[1] - c0[1]; 
                return Double.valueOf( 
                        PERCENT * (busytime) / (busytime + idletime)) 
                        .doubleValue(); 
            } else { 
                return 0.0; 
            } 
        } catch (Exception ex) { 
            ex.printStackTrace(); 
            return 0.0; 
        } 
    } 

    /**      

* 读取CPU信息. 
     * @param proc 
     * @return 
     * @author GuoHuang 
     */ 
    private long[] readCpu(final Process proc) { 
        long[] retn = new long[2]; 
        try { 
            proc.getOutputStream().close(); 
            InputStreamReader ir = new InputStreamReader(proc.getInputStream()); 
            LineNumberReader input = new LineNumberReader(ir); 
            String line = input.readLine(); 
            if (line == null || line.length() < FAULTLENGTH) { 
                return null; 
            } 
            int capidx = line.indexOf("Caption"); 
            int cmdidx = line.indexOf("CommandLine"); 
            int rocidx = line.indexOf("ReadOperationCount"); 
            int umtidx = line.indexOf("UserModeTime"); 
            int kmtidx = line.indexOf("KernelModeTime"); 
            int wocidx = line.indexOf("WriteOperationCount"); 
            long idletime = 0; 
            long kneltime = 0; 
            long usertime = 0; 
            while ((line = input.readLine()) != null) { 
                if (line.length() < wocidx) { 
                    continue; 
                } 
                // 字段出现顺序：Caption,CommandLine,KernelModeTime,ReadOperationCount, 
                // ThreadCount,UserModeTime,WriteOperation 
                String caption = line.substring( capidx, cmdidx - 1) 
                        .trim(); 
                String cmd = line.substring( cmdidx, kmtidx - 1).trim(); 
                if (cmd.indexOf("wmic.exe") >= 0) { 
                    continue; 
                } 
                // log.info("line="+line); 
                if (caption.equals("System Idle Process") 
                        || caption.equals("System")) { 
                    idletime += Long.valueOf( 
                    		line.substring( kmtidx, rocidx - 1).trim()) 
                            .longValue(); 
                    idletime += Long.valueOf( 
                    		line.substring( umtidx, wocidx - 1).trim()) 
                            .longValue(); 
                    continue; 
                } 

                kneltime += Long.valueOf( 
                		line.substring( kmtidx, rocidx - 1).trim()) 
                        .longValue(); 
                usertime += Long.valueOf( 
                		line.substring( umtidx, wocidx - 1).trim())
                        .longValue(); 
            } 
            retn[0] = idletime; 
            retn[1] = kneltime + usertime; 
            return retn; 
        } catch (Exception ex) { 
            ex.printStackTrace(); 
        } finally { 
            try { 
                proc.getInputStream().close(); 
            } catch (Exception e) { 
                e.printStackTrace(); 
            } 
        } 
        return null; 
    } 
}
